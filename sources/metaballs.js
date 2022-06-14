const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.webkitImageSmoothingEnabled = true;

const tempCanvas = document.createElement('canvas');
const tempCtx = tempCanvas.getContext('2d');

//constants
const numOfBalls = 25;
const ballBaseSize = 200;
const width = 1920;
const height = 1080;
const threshold = 150;
const colors = { r: 24, g: 30, b: 37 }
const cycle = 0;
const points = [];
const baseVelocity = 1;

canvas.width = width;
canvas.height = height;
tempCanvas.width = width;
tempCanvas.height = height;

// generate balls
const ballsPoint = Array.from({ length: numOfBalls }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() * baseVelocity * 2) - baseVelocity,
    vy: (Math.random() * baseVelocity * 2) - baseVelocity,
    size: Math.random() * ballBaseSize + ballBaseSize
}));

const update = () => {
    const t0 = performance.now();
    tempCtx.clearRect(0, 0, width, height);
    ballsPoint
        .forEach((ballPoint) => {
            ballPoint.x = ballPoint.x + ballPoint.vx;
            ballPoint.y = ballPoint.y + ballPoint.vy;

            if (ballPoint.x > width + ballPoint.size) {
                ballPoint.x = 0 - ballPoint.size
            } else if (ballPoint.x < 0 - ballPoint.size) {
                ballPoint.x = width + ballPoint.size
            }

            if (ballPoint.y > height + ballPoint.size) {
                ballPoint.y = 0 - ballPoint.size
            } else if (ballPoint.y < 0 - ballPoint.size) {
                ballPoint.y = height + ballPoint.size
            }
            tempCtx.beginPath();
            let grad = tempCtx.createRadialGradient(ballPoint.x, ballPoint.y, 1, ballPoint.x, ballPoint.y, ballPoint.size)
            grad.addColorStop(0, `rgba(${colors.r}, ${colors.g}, ${colors.b}, 1)`);
            grad.addColorStop(1, `rgba(${colors.r}, ${colors.g}, ${colors.b}, 0)`);
            tempCtx.fillStyle = grad;
            tempCtx.arc(ballPoint.x, ballPoint.y, ballPoint.size, 0, Math.PI * 2)
            tempCtx.fill();

            tempCtx.lineWidth = 2;
        });

    metabalize(t0);

    requestAnimationFrame(update);

};

const metabalize = (t0) => {
    let imageData = tempCtx.getImageData(0, 0, width, height);
    let pix = imageData.data;
    // rgba, hence i + 4 to the next red
    for (let i = 0; i < pix.length; i += 4) {
        let currentPixAlpha = pix[i + 3];
        if (currentPixAlpha < threshold) {
            currentPixAlpha *= 0.167;
            if (currentPixAlpha > threshold * 0.25) {
                currentPixAlpha = 0;
            }
            pix[i + 3] = currentPixAlpha;
        }
    }

    ctx.putImageData(imageData, 0, 0);
};

update();
