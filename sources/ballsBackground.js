const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.webkitImageSmoothingEnabled = true;

const tempCanvas = document.createElement('canvas');
const tempCtx = tempCanvas.getContext('2d');

//constants
const numOfBalls = 5;
const ballBaseSize = 100;
const threshold = 0;
const colors = { r: 29, g: 35, b: 42 }
const cycle = 0;
const points = [];
const baseVelocity = 5;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
tempCanvas.width = window.innerWidth;
tempCanvas.height = window.innerHeight;

//add a resize event listener to the window
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    tempCanvas.width = window.innerWidth;
    tempCanvas.height = window.innerHeight;
}, false);

// generate balls
const ballsPoint = Array.from({ length: numOfBalls }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() * baseVelocity * 2) - baseVelocity,
    vy: (Math.random() * baseVelocity * 2) - baseVelocity,
    size: Math.random() * ballBaseSize + ballBaseSize
}));

const update = () => {
    const t0 = performance.now();
    tempCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ballsPoint
        .forEach((ballPoint) => {
            ballPoint.x = ballPoint.x + ballPoint.vx;
            ballPoint.y = ballPoint.y + ballPoint.vy;

            if (ballPoint.x > window.innerWidth + ballPoint.size) {
                ballPoint.x = 0 - ballPoint.size
            } else if (ballPoint.x < 0 - ballPoint.size) {
                ballPoint.x = window.innerWidth + ballPoint.size
            }

            if (ballPoint.y > window.innerHeight + ballPoint.size) {
                ballPoint.y = 0 - ballPoint.size
            } else if (ballPoint.y < 0 - ballPoint.size) {
                ballPoint.y = window.innerHeight + ballPoint.size
            }
            tempCtx.beginPath();
            let grad = tempCtx.createRadialGradient(ballPoint.x, ballPoint.y, 1, ballPoint.x, ballPoint.y, ballPoint.size)
            grad.addColorStop(1, `rgb(${colors.r}, ${colors.g}, ${colors.b})`);
            tempCtx.fillStyle = grad;
            tempCtx.arc(ballPoint.x, ballPoint.y, ballPoint.size, 0, Math.PI * 2)
            tempCtx.fill();

            tempCtx.lineWidth = 2;
        });

    metabalize(t0);

    requestAnimationFrame(update);

};

const metabalize = (t0) => {
    let imageData = tempCtx.getImageData(0, 0, window.innerWidth, window.innerHeight);
    let pix = imageData.data;
    // rgba, hence i + 4 to the next red
    for (let i = 0; i < pix.length; i += 4) {
        let currentPixAlpha = pix[i + 3];
        if (currentPixAlpha < threshold) {
            currentPixAlpha  = 1;
            if (currentPixAlpha > threshold * 0.25) {
                currentPixAlpha = 1;
            }
            pix[i + 3] = currentPixAlpha;
        }
    }

    ctx.putImageData(imageData, 0, 0);
};

update();
