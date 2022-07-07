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
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    tempCanvas.width = window.innerWidth;
    tempCanvas.height = window.innerHeight;
}, false);

const getObjectType = () => {
    let type = Math.floor(Math.random() * 3);
    switch (type) {
        case 0:
            return 'circle';
        case 1:
            return 'square';
        case 2:
            return 'triangle';
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
    size: Math.random() * baseSize + baseSize,
    type: getObjectType(),
    angularVelocity: ((Math.random() * baseVelocity * 2) - baseVelocity) / 100,
    color: getObjectColor()
}));

const checkCollision = () => {
    objects.forEach(element => {
        objects.forEach(element2 => {
            if (element != element2) {
                let dx = element.x - element2.x;
                let dy = element.y - element2.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
        
                if (distance < element.radius + element2.radius) {
                    // collision detected!
                }
            }
        });
    });
}

const update = () => {
    tempCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    objects
        .forEach((object) => {
            checkCollision();
            object.x = object.x + object.vx;
            object.y = object.y + object.vy;

            if (object.x > window.innerWidth + object.size) {
                object.x = 0 - object.size
            } else if (object.x < 0 - object.size) {
                object.x = window.innerWidth + object.size
            }

            if (object.y > window.innerHeight + object.size) {
                object.y = 0 - object.size
            } else if (object.y < 0 - object.size) {
                object.y = window.innerHeight + object.size
            }
            tempCtx.beginPath();
            tempCtx.fillStyle = object.color;
            tempCtx.arc(object.x, object.y, object.size, 0, 2 * Math.PI);
            tempCtx.fill();
            tempCtx.setTransform(1,0,0,1,0,0)

            tempCtx.lineWidth = 2;
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

    

    update();
}