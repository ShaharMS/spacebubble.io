var canvas;
var ctx;

var tempCanvas = document.createElement('canvas');
var tempCtx = tempCanvas.getContext('2d');

//constants
let numberOfObjects = 5;
let baseSize = 75;
let color = ["#16336c", "#2A63D1"];
let baseVelocity = 1;

//add a resize event listener to the window

const getObjectType = () => {
    let type = Math.floor(Math.random() * 3);
    switch (type) {
        case 0:
            return 'circle';
        case 1:
            return 'square';
        case 2:
            return 'triangle';
        default:
            return 'circle';
    }
}

let previousColor = -1;

const getObjectColor = () => {
    let c = Math.floor(Math.random() * color.length);
    
    if (previousColor == c)
        return getObjectColor();
    else
        previousColor = c
        
        
    return color[c]

}

// generate balls
let objects = Array.from({ length: numberOfObjects }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() * baseVelocity * 2) - baseVelocity,
    vy: (Math.random() * baseVelocity * 2) - baseVelocity,
    radius: Math.random() * baseSize + baseSize,
    type: getObjectType(),
    angularVelocity: ((Math.random() * baseVelocity * 2) - baseVelocity) / 100,
    color: getObjectColor()
}));

const getCollisionDirection = (object1, object2) => {
    let x = object1.x - object2.x;
    let y = object1.y - object2.y;
    let radians = Math.atan2(y, x);
    return radians;
}

const getVPosFromAngle = (angle) => {

    let vx = Math.cos(angle);
    let vy = Math.sin(angle);

    return {vx: vx, vy: vy};
}

const checkCollision = () => {
    objects.forEach((object1, index1) => {
        objects.forEach((object2, index2) => {
            if (index1 != index2) {
                let distance = Math.sqrt(Math.pow(object1.x - object2.x, 2) + Math.pow(object1.y - object2.y, 2));
                if (distance < object1.radius + object2.radius) {
                    let vPosForObject1 = getVPosFromAngle(getCollisionDirection(object1, object2));
                    let vPosForObject2 = getVPosFromAngle(getCollisionDirection(object2, object1));
                    //calculate vx and vy based on the angles the objects should be travelling at
                    object1.vx = vPosForObject1.vx;
                    object1.vy = vPosForObject1.vy;
                    object2.vx = vPosForObject2.vx;
                    object2.vy = vPosForObject2.vy;
                }
            }
        });

        if (object1.x - object1.radius < 0) object1.vx = Math.abs(object1.vx);
        if (object1.x + object1.radius > window.innerWidth) object1.vx = -Math.abs(object1.vx);
        if (object1.y - object1.radius < 0) object1.vy = Math.abs(object1.vy);
        if (object1.y + object1.radius > window.innerHeight) object1.vy = -Math.abs(object1.vy);
    });
}

const update = () => {
    tempCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    objects.forEach((object) => {
            checkCollision();
            object.x = object.x + object.vx;
            object.y = object.y + object.vy;

            if (object.x > window.innerWidth + object.radius) {
                object.x = 0 - object.radius
            } else if (object.x < 0 - object.radius) {
                object.x = window.innerWidth + object.radius
            }

            if (object.y > window.innerHeight + object.radius) {
                object.y = 0 - object.radius
            } else if (object.y < 0 - object.radius) {
                object.y = window.innerHeight + object.radius
            }
            tempCtx.beginPath();
            tempCtx.fillStyle = object.color;
            tempCtx.arc(object.x, object.y, object.radius, 0, 2 * Math.PI);
            tempCtx.fill();
        });

        let imageData = tempCtx.getImageData(0, 0, window.innerWidth, window.innerHeight);

        ctx.putImageData(imageData, 0, 0);

    requestAnimationFrame(update);

};
/**
 * 
 * @param {Number} objNum The number of balls to be generated
 * @param {Number} bSize The base size of the balls
 * @param {string[]} colors  The color of the balls
 * @param {Number} velocity  The velocity of the balls
 */
function startShapeBackground(objNum, bSize, colors, velocity) {
    numberOfObjects = objNum || numberOfObjects;
    baseSize = bSize || baseSize;
    color = colors || color;
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

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        tempCanvas.width = window.innerWidth;
        tempCanvas.height = window.innerHeight;
    }, false);

    update();
}