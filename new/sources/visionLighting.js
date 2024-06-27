let lastMouseX = 0; let lastMouseY = 0;
let RADIUS = 150;
let section6 = document.getElementById("section-6");
/**
 * @type {HTMLCanvasElement}
 */
let overlay = section6.querySelector("canvas.overlay");

overlay.width = section6.clientWidth;
overlay.height = section6.clientHeight;
/**
 * @type {CanvasRenderingContext2D}
 */
let context = overlay.getContext('2d');

/**
 * Rotates a point around a pivot point by a given angle.
 *
 * @param {Array<number>} pivot - The coordinates of the pivot point.
 * @param {Array<number>} point - The coordinates of the point to be rotated.
 * @param {number} angle - The angle of rotation in radians.
 * @return {Array<number>} - The coordinates of the rotated point.
 */
function rotatePoint(pivot, point, angle) {
    cx = pivot[0], cy = pivot[1];
    x = point[0], y = point[1];
    if(angle == 0)
        return [parseFloat(x), parseFloat(y)];
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
    var ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny]
}

/**
 * Updates the cursor position on the section-6 element.
 *
 * @param {Event} e - The event object containing the clientX and clientY coordinates.
 * @return {void} This function does not return a value.
 */
function update(e) {
    var rect = section6.getBoundingClientRect()
    if (e.type !== "scroll") {
        lastMouseX = e.clientX
        lastMouseY = e.clientY
    }
    var x = e.clientX || lastMouseX
    var y = e.clientY || lastMouseY
    x = x - rect.left
    y = y - rect.top
    section6.style.setProperty('--cursorX', x + 'px')
    section6.style.setProperty('--cursorY', y + 'px')

    //change angle of searchlights
    if (section6.classList.contains("spotlight")) {
        let spotlight1Pos = document.getElementById("se1").getBoundingClientRect();
        let spotlight2Pos = document.getElementById("se2").getBoundingClientRect();

        let deg1 = Math.atan2(y - spotlight1Pos.y, x - spotlight1Pos.x) * 180 / Math.PI
        let deg2 = Math.atan2(y - spotlight2Pos.y, x - spotlight2Pos.x) * 180 / Math.PI
        document.getElementById("se1").style.setProperty('--deg', -deg1 + 90 + "deg")
        document.getElementById("se2").style.setProperty('--deg', deg2 - 90 + "deg")

        // Draw on canvas
        context.globalCompositeOperation = 'source-over';
        context.clearRect(0, 0, overlay.width, overlay.height);
        context.fillStyle = 'rgba(0, 0, 0, 0.7)';
        context.fillRect(0, 0, overlay.width, overlay.height);

        context.globalCompositeOperation = 'destination-out';
        context.fillStyle = 'rgba(255, 255, 255, 1)';
        // Draw the circle - now, everything drawn will be transparent
        context.beginPath();
        // And draw the trapezoid beams, from each corner of the searchlight to the circle:
        let centerSe1 = [spotlight1Pos.x + spotlight1Pos.width / 2, spotlight1Pos.y + spotlight1Pos.height / 2]
        let centerSe2 = [spotlight2Pos.x + spotlight2Pos.width / 2, spotlight2Pos.y + spotlight2Pos.height / 2]
        
        let startSe1 = rotatePoint(centerSe1, [spotlight1Pos.x, spotlight1Pos.y + spotlight1Pos.height], (-deg1 + 90) * Math.PI / 180)
        let startSe2 = rotatePoint(centerSe2, [spotlight2Pos.x, spotlight2Pos.y + spotlight2Pos.height], (-deg2 + 90) * Math.PI / 180)

        let endSe1 = rotatePoint(centerSe1, [spotlight1Pos.x + spotlight1Pos.width, spotlight1Pos.y + spotlight1Pos.height], (-deg1 + 90) * Math.PI / 180)
        let endSe2 = rotatePoint(centerSe2, [spotlight2Pos.x + spotlight2Pos.width, spotlight2Pos.y + spotlight2Pos.height], (-deg2 + 90) * Math.PI / 180)

        let mid1Se1 = [x + Math.cos((deg1 + 90) * Math.PI / 180) * RADIUS, y + Math.sin((deg1 + 90) * Math.PI / 180) * RADIUS];
        let mid2Se1 = [x - Math.cos((deg1 + 90) * Math.PI / 180) * RADIUS, y - Math.sin((deg1 + 90) * Math.PI / 180) * RADIUS];

        let mid1Se2 = [x + Math.cos((deg2 + 90) * Math.PI / 180) * RADIUS, y + Math.sin((deg2 + 90) * Math.PI / 180) * RADIUS];
        let mid2Se2 = [x - Math.cos((deg2 + 90) * Math.PI / 180) * RADIUS, y - Math.sin((deg2 + 90) * Math.PI / 180) * RADIUS];

        context.moveTo(startSe1[0], startSe1[1]);
        context.lineTo(mid1Se1[0], mid1Se1[1]);
        context.lineTo(mid2Se1[0], mid2Se1[1]);
        context.lineTo(endSe1[0], endSe1[1]);
        context.lineTo(startSe1[0], startSe1[1]);
        context.fill();

        context.moveTo(startSe2[0], startSe2[1]);
        context.lineTo(mid1Se2[0], mid1Se2[1]);
        context.lineTo(mid2Se2[0], mid2Se2[1]);
        context.lineTo(endSe2[0], endSe2[1]);
        context.lineTo(startSe2[0], startSe2[1]);
        context.fill();

        context.arc(x, y, RADIUS, 0, 2 * Math.PI, false);
        context.fill();

        context.closePath();
    }
}

section6.addEventListener('mousemove', update)
section6.addEventListener('touchmove', update)
window.addEventListener('scroll', update)
