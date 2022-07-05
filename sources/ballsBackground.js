var canvas;
var ctx;

var tempCanvas = document.createElement('canvas');
var tempCtx = tempCanvas.getContext('2d');

//constants
let numOfBalls = 5;
let ballBaseSize = 100;
let threshold = 0;
let colors = { r: 29, g: 35, b: 42 }
let cycle = 0;
let points = [];
let baseVelocity = 5;

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

/**
 * 
 * @param {Number} ballNum The number of balls to be generated
 * @param {Number} baseBallSize The base size of the balls
 * @param {{r:Number, g:Number, b:Number}} color  The color of the balls
 * @param {Number} velocity  The velocity of the balls
 */
function start(ballNum, baseBallSize, color, velocity) {
    numOfBalls = ballNum || numOfBalls;
    ballBaseSize = baseBallSize || ballBaseSize;
    threshold = 0;
    colors = color || colors;
    cycle = 0;
    points = [];
    baseVelocity = velocity;

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.webkitImageSmoothingEnabled = true;

    tempCanvas = document.createElement('canvas');
    tempCtx = tempCanvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    tempCanvas.width = window.innerWidth;
    tempCanvas.height = window.innerHeight;

    update();
}

