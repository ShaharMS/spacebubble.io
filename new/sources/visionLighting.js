const SEARCHLIGHT_WIDTH = 60;
const SEARCHLIGHT_HEIGHT = 40;

const SEARCHLIGHT_Y = 16;
const SEARCHLIGHT_X = (mirror) => {
    return mirror ? 11.5 : document.body.clientWidth - 11.5 - SEARCHLIGHT_WIDTH;
};

let lastMouseX = 0; let lastMouseY = 0;

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
        let dist1 = Math.sqrt(Math.pow(x - SEARCHLIGHT_X(false), 2) + Math.pow(y - SEARCHLIGHT_Y, 2))
        let dist2 = Math.sqrt(Math.pow(x - SEARCHLIGHT_X(true), 2) + Math.pow(y - SEARCHLIGHT_Y, 2))
        let RADIUS1 = SEARCHLIGHT_WIDTH * dist1 / (document.body.clientWidth / 3);
        let RADIUS2 = SEARCHLIGHT_WIDTH * dist2 / (document.body.clientWidth / 3);

        let deg1 = Math.atan2(y - (SEARCHLIGHT_Y), x - (SEARCHLIGHT_X(true))) * 180 / Math.PI
        let deg2 = Math.atan2(y - (SEARCHLIGHT_Y), x - (SEARCHLIGHT_X(false))) * 180 / Math.PI
        document.getElementById("se1").style.setProperty('--deg', -deg1 + 90 + "deg")
        document.getElementById("se2").style.setProperty('--deg', deg2 - 90 + "deg")

        deg1 = Math.atan2(y - SEARCHLIGHT_Y, x - SEARCHLIGHT_X(false)) * 180 / Math.PI
        deg2 = Math.atan2(y - SEARCHLIGHT_Y, x - SEARCHLIGHT_X(true)) * 180 / Math.PI

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
        let centerSe1 = [SEARCHLIGHT_X(false) + SEARCHLIGHT_WIDTH / 2, SEARCHLIGHT_Y + SEARCHLIGHT_HEIGHT / 2]
        let centerSe2 = [SEARCHLIGHT_X(true) + SEARCHLIGHT_WIDTH / 2, SEARCHLIGHT_Y + SEARCHLIGHT_HEIGHT / 2]
        
        let startSe1 = rotatePoint(centerSe1, [SEARCHLIGHT_X(false), SEARCHLIGHT_Y + SEARCHLIGHT_HEIGHT], (-deg1 + 90) * Math.PI / 180)
        let startSe2 = rotatePoint(centerSe2, [SEARCHLIGHT_X(true), SEARCHLIGHT_Y + SEARCHLIGHT_HEIGHT], (-deg2 + 90) * Math.PI / 180)

        let endSe1 = rotatePoint(centerSe1, [SEARCHLIGHT_X(false) + SEARCHLIGHT_WIDTH, SEARCHLIGHT_Y + SEARCHLIGHT_HEIGHT], (-deg1 + 90) * Math.PI / 180)
        let endSe2 = rotatePoint(centerSe2, [SEARCHLIGHT_X(true) + SEARCHLIGHT_WIDTH, SEARCHLIGHT_Y + SEARCHLIGHT_HEIGHT], (-deg2 + 90) * Math.PI / 180)

        let mid1Se1 = [x + Math.cos((deg1 + 90) * Math.PI / 180) * RADIUS1, y + Math.sin((deg1 + 90) * Math.PI / 180) * RADIUS1];
        let mid2Se1 = [x - Math.cos((deg1 + 90) * Math.PI / 180) * RADIUS1, y - Math.sin((deg1 + 90) * Math.PI / 180) * RADIUS1];

        let mid1Se2 = [x + Math.cos((deg2 + 90) * Math.PI / 180) * RADIUS2, y + Math.sin((deg2 + 90) * Math.PI / 180) * RADIUS2];
        let mid2Se2 = [x - Math.cos((deg2 + 90) * Math.PI / 180) * RADIUS2, y - Math.sin((deg2 + 90) * Math.PI / 180) * RADIUS2];

        context.moveTo(startSe1[0], startSe1[1]);
        context.lineTo(mid1Se1[0], mid1Se1[1]);
        context.lineTo(mid2Se1[0], mid2Se1[1]);
        context.lineTo(endSe1[0], endSe1[1]);
        context.lineTo(startSe1[0], startSe1[1]);
        context.fill();
        context.closePath();


        context.beginPath();
        context.arc((mid1Se1[0] + mid2Se1[0]) / 2, (mid1Se1[1] + mid2Se1[1]) / 2, RADIUS1, (deg1 + 90) * Math.PI / 180, (deg1 - 90 - 180) * Math.PI / 180, false);
        context.fill();
        context.closePath();

        context.beginPath();
        context.moveTo(startSe2[0], startSe2[1]);
        context.lineTo(mid1Se2[0], mid1Se2[1]);
        context.lineTo(mid2Se2[0], mid2Se2[1]);
        context.lineTo(endSe2[0], endSe2[1]);
        context.lineTo(startSe2[0], startSe2[1]);
        context.fill();
        context.closePath();

        context.beginPath();
        context.arc((mid1Se2[0] + mid2Se2[0]) / 2, (mid1Se2[1] + mid2Se2[1]) / 2, RADIUS2, (deg2 - 90) * Math.PI / 180, (deg2 + 90 + 180) * Math.PI / 180, true);
        context.fill();
        context.closePath();
    }
}

section6.addEventListener('mousemove', update)
section6.addEventListener('touchmove', update)
window.addEventListener('scroll', update)
