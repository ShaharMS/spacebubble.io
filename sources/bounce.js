function bounce(element, speed) {
    let i = 0;
    var speed = speed || 5;
    let oldTop = element.style.top;
    let positions = getPositionalInfo(85, 5);
    var id = setInterval(bounceUp, speed);
    function bounceUp() {
        if (i == positions.length) i = 0;
        element.style.top = positions[i] + 'vh';

        i++;
    }
}

function startBounce() {
    var elements = document.getElementsByClassName('bouncing');
    for (var i = 0; i < elements.length; i++) {
        bounce(elements[i]);
    }
}

const getPositionalInfo = (bottom, jumpHeight) => {
    return [
        bottom,
        bottom - jumpHeight / 6,
        bottom - jumpHeight / 5.5,
        bottom - jumpHeight / 5,
        bottom - jumpHeight / 4.5,
        bottom - jumpHeight / 4,
        bottom - jumpHeight / 3,
        bottom - jumpHeight / 2.5,
        bottom - jumpHeight / 2,
        bottom - jumpHeight / 1.75,
        bottom - jumpHeight / 1.5,
        bottom - jumpHeight / 1.4,
        bottom - jumpHeight / 1.3,
        bottom - jumpHeight / 1.2,
        bottom - jumpHeight / 1.1,
        bottom - jumpHeight,
        bottom - jumpHeight,
        bottom - jumpHeight,
        bottom - jumpHeight / 1.1,
        bottom - jumpHeight / 1.2,
        bottom - jumpHeight / 1.5,
        bottom - jumpHeight / 2,
        bottom - jumpHeight / 3,
        bottom - jumpHeight / 4,
        bottom - jumpHeight / 5,
        bottom - jumpHeight / 6.5,
        bottom - jumpHeight / 8,
        bottom - jumpHeight / 10,
        bottom,
        bottom,
        bottom,
        bottom - jumpHeight / 10,
        bottom - jumpHeight / 9,
        bottom - jumpHeight / 8,
        bottom - jumpHeight / 7,
        bottom - jumpHeight / 6,
        bottom - jumpHeight / 5.5,
        bottom - jumpHeight / 5,
        bottom - jumpHeight / 5.5,
        bottom - jumpHeight / 6,
        bottom - jumpHeight / 7,    
        bottom - jumpHeight / 8,
        bottom - jumpHeight / 9,
        bottom - jumpHeight / 10,
        bottom,
        bottom - jumpHeight / 10,
        bottom - jumpHeight / 9,
        bottom - jumpHeight / 8,
        bottom - jumpHeight / 8,
        bottom - jumpHeight / 9,
        bottom - jumpHeight / 10,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom,
        bottom
    ];
}