/*          *     .        *  .    *    *   . 
 .  *  move your mouse to over the stars   .
 *  .  .   change these values:   .  *
   .      * .        .          * .       */
const starsBackground__STAR_COLOR = "#fff";
const starsBackground__STAR_SIZE = 3;
const starsBackground__STAR_MIN_SCALE = 0.2;
const starsBackground__OVERFLOW_THRESHOLD = 50;
const starsBackground__STAR_COUNT = (window.innerWidth + window.innerHeight) / 20;
const starsBackground__TRAIL_PERCENTAGE = 0.08;
const starsBackground__canvas = document.getElementById("section-1-bg"),
	starsBackground__context = starsBackground__canvas.getContext("2d");
let starsBackground__scale = 1,
	// device pixel ratio
	starsBackground__width,
	starsBackground__height;
let starsBackground__stars = [];
let starsBackground__pointerX, starsBackground__pointerY;
let starsBackground__velocity = {
	x: 0,
	y: 0,
	tx: 0,
	ty: 0,
	z: 0.0005
};
let starsBackground__touchInput = false;
starsBackground__generate();
starsBackground__resize();
starsBackground__step();
window.onresize = starsBackground__resize;
starsBackground__canvas.onmousemove = starsBackground__onMouseMove;
starsBackground__canvas.ontouchmove = starsBackground__onTouchMove;
starsBackground__canvas.ontouchend = starsBackground__onMouseLeave;
document.onmouseleave = starsBackground__onMouseLeave;
function starsBackground__generate() {
	for (let i = 0; i < starsBackground__STAR_COUNT; i++) {
		starsBackground__stars.push({
			x: 0,
			y: 0,
			z: starsBackground__STAR_MIN_SCALE + Math.random() * (1 - starsBackground__STAR_MIN_SCALE)
		});
	}
}
function starsBackground__placeStar(star) {
	star.x = Math.random() * starsBackground__width;
	star.y = Math.random() * starsBackground__height;
}
function starsBackground__recycleStar(star) {
	let direction = "z";
	let vx = Math.abs(starsBackground__velocity.x),
		vy = Math.abs(starsBackground__velocity.y);
	if (vx > 1 || vy > 1) {
		let axis;
		if (vx > vy) {
			axis = Math.random() < vx / (vx + vy) ? "h" : "v";
		} else {
			axis = Math.random() < vy / (vx + vy) ? "v" : "h";
		}
		if (axis === "h") {
			direction = starsBackground__velocity.x > 0 ? "l" : "r";
		} else {
			direction = starsBackground__velocity.y > 0 ? "t" : "b";
		}
	}
	star.z = starsBackground__STAR_MIN_SCALE + Math.random() * (1 - starsBackground__STAR_MIN_SCALE);
	if (direction === "z") {
		star.z = 0.1;
		star.x = Math.random() * starsBackground__width;
		star.y = Math.random() * starsBackground__height;
	} else if (direction === "l") {
		star.x = -starsBackground__OVERFLOW_THRESHOLD;
		star.y = starsBackground__height * Math.random();
	} else if (direction === "r") {
		star.x = starsBackground__width + starsBackground__OVERFLOW_THRESHOLD;
		star.y = starsBackground__height * Math.random();
	} else if (direction === "t") {
		star.x = starsBackground__width * Math.random();
		star.y = -starsBackground__OVERFLOW_THRESHOLD;
	} else if (direction === "b") {
		star.x = starsBackground__width * Math.random();
		star.y = starsBackground__height + starsBackground__OVERFLOW_THRESHOLD;
	}
}
function starsBackground__resize() {
	starsBackground__scale = window.devicePixelRatio || 1;
	starsBackground__width = window.innerWidth * starsBackground__scale;
	starsBackground__height = window.innerHeight * starsBackground__scale;
	starsBackground__canvas.width = starsBackground__width;
	starsBackground__canvas.height = starsBackground__height;
	starsBackground__stars.forEach(starsBackground__placeStar);
}
function starsBackground__step() {
	starsBackground__context.clearRect(0, 0, starsBackground__width, starsBackground__height);
	starsBackground__update();
	render();
	requestAnimationFrame(starsBackground__step);
}
function starsBackground__update() {
	starsBackground__velocity.tx *= 0.96;
	starsBackground__velocity.ty *= 0.96;
	starsBackground__velocity.x += (starsBackground__velocity.tx - starsBackground__velocity.x) * 0.8;
	starsBackground__velocity.y += (starsBackground__velocity.ty - starsBackground__velocity.y) * 0.8;
	starsBackground__stars.forEach((star) => {
		star.x += starsBackground__velocity.x * star.z;
		star.y += starsBackground__velocity.y * star.z;
		star.x += (star.x - starsBackground__width / 2) * starsBackground__velocity.z * star.z;
		star.y += (star.y - starsBackground__height / 2) * starsBackground__velocity.z * star.z;
		star.z += starsBackground__velocity.z;

		// recycle when out of bounds
		if (
			star.x < -starsBackground__OVERFLOW_THRESHOLD ||
			star.x > starsBackground__width + starsBackground__OVERFLOW_THRESHOLD ||
			star.y < -starsBackground__OVERFLOW_THRESHOLD ||
			star.y > starsBackground__height + starsBackground__OVERFLOW_THRESHOLD
		) {
			starsBackground__recycleStar(star);
		}
	});
}
function render() {
	starsBackground__stars.forEach((star) => {
		starsBackground__context.beginPath();
		starsBackground__context.lineCap = "round";
		starsBackground__context.lineWidth = starsBackground__STAR_SIZE * star.z * starsBackground__scale;
		starsBackground__context.globalAlpha = 0.5 + 0.5 * Math.random();
		starsBackground__context.strokeStyle = starsBackground__STAR_COLOR;
		starsBackground__context.beginPath();
		starsBackground__context.moveTo(star.x, star.y);
		let tailX = starsBackground__velocity.x * starsBackground__TRAIL_PERCENTAGE,
			tailY = starsBackground__velocity.y * starsBackground__TRAIL_PERCENTAGE;

		// stroke() wont work on an invisible line
		if (Math.abs(tailX) < 0.1) tailX = 0.1;
		if (Math.abs(tailY) < 0.1) tailY = 0.1;
		starsBackground__context.lineTo(star.x + tailX, star.y + tailY);
		starsBackground__context.stroke();
	});
}
function starsBackground__movePointer(x, y) {
	if (typeof starsBackground__pointerX === "number" && typeof starsBackground__pointerY === "number") {
		let ox = x - starsBackground__pointerX,
			oy = y - starsBackground__pointerY;
		starsBackground__velocity.tx = starsBackground__velocity.tx + (ox / 8) * starsBackground__scale * (starsBackground__touchInput ? 1 : -1);
		starsBackground__velocity.ty = starsBackground__velocity.ty + (oy / 8) * starsBackground__scale * (starsBackground__touchInput ? 1 : -1);
	}
	starsBackground__pointerX = x;
	starsBackground__pointerY = y;
}
function starsBackground__onMouseMove(event) {
	starsBackground__touchInput = false;
	starsBackground__movePointer(event.clientX, event.clientY);
}
function starsBackground__onTouchMove(event) {
	starsBackground__touchInput = true;
	starsBackground__movePointer(event.touches[0].clientX, event.touches[0].clientY, true);
	event.preventDefault();
}
function starsBackground__onMouseLeave() {
	starsBackground__pointerX = null;
	starsBackground__pointerY = null;
}
