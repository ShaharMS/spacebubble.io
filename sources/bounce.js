function bounce(element, speed) {
    let i = 0;
    var speed = speed || 20;
    let positions = getPositionalInfo(85, 10);
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
        bottom - jumpHeight / 5,
        bottom - jumpHeight / 4,
        bottom - jumpHeight / 2,
        bottom - jumpHeight / 1.5,
        bottom - jumpHeight / 1.2,
        bottom - jumpHeight / 1.1,
        bottom - jumpHeight,
        bottom - jumpHeight / 1.1,
        bottom - jumpHeight / 1.2,
        bottom - jumpHeight / 1.5,
        bottom - jumpHeight / 2,
        bottom - jumpHeight / 4,
        bottom - jumpHeight / 5,
        bottom - jumpHeight / 8,
        bottom - jumpHeight / 10,
        bottom,
        bottom - jumpHeight / 10,
        bottom - jumpHeight / 9,
        bottom - jumpHeight / 8,
        bottom - jumpHeight / 5,
        bottom - jumpHeight / 8,
        bottom - jumpHeight / 9,
        bottom - jumpHeight / 10,
        bottom,
        bottom - jumpHeight / 10,
        bottom - jumpHeight / 8,
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
        bottom
    ];
}