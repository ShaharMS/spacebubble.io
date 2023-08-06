let w = window.innerWidth;
let h = window.innerHeight;
let animated = false;
const select = function (el) {
	return document.getElementById(el);
};
const wrapper = select("main-wrapper");
const checkBox = select("toggle");
const images = [
	{
		id: "#keyboard",
		name: "keyboard"
	},
	{
		id: "#headphones",
		name: "headphones"
	}, 
	{
		id: "#frying-pan",
		name: "frying-pan"
	},
	{
		id: "#dumbbell",
		name: "dumbbell"
	},
	{
		id: "#planet-2",
		name: "planet-2"
	},
	{
		id: "#moon-crescent",
		name: "moon-crescent"
	},
	{
		id: "#moon-full",
		name: "moon-full"
	},
	{
		id: "#constellation",
		name: "constellation"
	},
	{
		id: "#comet",
		name: "comet"
	},
	{
		id: "#galaxy",
		name: "galaxy"
	}
];
const svgs_stars = ["#star-1", "#star-2", "#star-3"];
checkBox.addEventListener("change", checkStatus);
window.addEventListener("resize", function () {
	w = window.innerWidth;
	h = window.innerHeight;
	init();
});

// building the pattern
function El(image, x, y, delay) {
	this.image = image;
	this.x = x;
	this.y = y;
	this.delay = delay;
}
El.prototype.attach = function () {
	this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	this.use = document.createElementNS("http://www.w3.org/2000/svg", "use");
	this.use.setAttributeNS(
		"http://www.w3.org/1999/xlink",
		"xlink:href",
		this.image.id
	);
	this.svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
	this.svg.setAttribute(
		"style",
		"top: " +
		this.y +
		"px; left: " +
		this.x +
		"px; animation-delay: " +
		this.delay +
		"s;"
	);
};
function Star(image, x, y) {
	this.image = image;
	this.x = x;
	this.y = y;
}
Star.prototype.attach = function () {
	this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	this.use = document.createElementNS("http://www.w3.org/2000/svg", "use");
	this.use.setAttributeNS(
		"http://www.w3.org/1999/xlink",
		"xlink:href",
		this.image
	);
	this.svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
	this.svg.setAttribute(
		"style",
		"top: " + this.y + "px; left: " + this.x + "px;"
	);
	this.svg.setAttribute("class", "star");
};
const spacing = 170;
const yOffset = 15;
let i, s;
function init() {
	while (wrapper.firstChild) {
		wrapper.removeChild(wrapper.firstChild);
	}
	i = 0;
	s = 0;
	for (let y = 0; y <= h; y += spacing) {
		if (y % (spacing * 2) === 0) {
			for (let x = 0; x <= w; x += spacing) {
				if (x % (spacing * 2) === 0) {
					draw(x, y + yOffset);
				} else {
					draw(x, y - yOffset);
				}
			}
		} else {
			for (let x = -(spacing / 2); x <= w; x += spacing) {
				if ((x + spacing / 2) % (2 * spacing) === 0) {
					draw(x, y + yOffset);
				} else {
					draw(x, y - yOffset);
				}
			}
		}
	}
	const newSpacing = spacing - 40;
	for (let y = newSpacing; y <= h; y += spacing) {
		for (let x = -(spacing / 2); x <= w; x += spacing) {
			if ((x + spacing / 2) % (2 * spacing) === 0) {
				drawStar(x, y + 10);
			} else {
				drawStar(x, y - 10);
			}
		}
	}
}
function draw(x, y) {
	const image = images[i];
	const delay = Math.floor(Math.random() * 2);
	const el = new El(image, x, y, delay);
	if (i === images.length - 1) {
		i = 0;
	} else {
		i++;
	}
	el.attach();
	el.svg.appendChild(el.use);
	wrapper.appendChild(el.svg);
}
function drawStar(x, y) {
	const image = stars[s];
	const star = new Star(image, x, y);
	if (s === stars.length - 1) {
		s = 0;
	} else {
		s++;
	}
	star.attach();
	star.svg.appendChild(star.use);
	wrapper.appendChild(star.svg);
}
init();

// Animation functions
const keyboard = document.querySelector("symbol#keyboard");
const headphones = document.querySelector("symbol#headphones");
const fryingPan = document.querySelector("symbol#frying-pan");
const dumbbell = document.querySelector("symbol#dumbbell");
const moonFull = document.querySelector("symbol#moon-full");
const galaxy = document.querySelector("symbol#galaxy");
const planet2 = document.querySelector("symbol#planet-2");
const moonCrescent = document.querySelector("symbol#moon-crescent");
const comet = document.querySelector("symbol#comet");
const constellationStars = document.querySelectorAll("symbol#constellation polygon");
let cometLines = document.querySelectorAll("symbol#comet .trail");

// Some styling needs to be pre-applied
keyboard.style.transformOrigin = "center";
keyboard.style.transform = "rotate(25deg)";

headphones.style.transformOrigin = "center";
headphones.style.transform = "rotate(-5deg)";

dumbbell.style.transformOrigin = "center";
dumbbell.style.transform = "rotate(-10deg)";

fryingPan.style.transformOrigin = "right";
fryingPan.style.transform = "rotate(-15deg)";

const tlKeyboard = new TimelineMax({
	repeat: -1,
	paused: false,
	yoyo: true
});
tlKeyboard.to(keyboard, 1, {
	rotation: 35,
	ease: Power0.easeNone,
	transformOrigin: "50% 50%"
}).to(keyboard, 1, {
	rotation: 25,
	ease: Power0.easeNone,
	transformOrigin: "50% 50%"
});

const tlHeadphones = new TimelineMax({
	repeat: -1,
	paused: false,
	yoyo: true
});
tlHeadphones.to(headphones, 0.5, {
	x: 1,
	y: 3,
	rotation: 0,
	ease: Power0.easeNone
});

const tlFryingPan = new TimelineMax({
	repeat: -1,
	paused: false,
	yoyo: true
});
tlFryingPan.to(fryingPan, 2, {
	x: 0,
	y: -5,
	rotation: 4,
	ease: Power0.easeNone
});

const tlDumbbell = new TimelineMax({
	repeat: -1,
	paused: false
});
tlDumbbell.to(dumbbell, 2, {
	rotation: 10,
	ease: Sine.inOut
}).to(dumbbell, 0.3, {}).to(dumbbell, 2, {
	rotation: -10,
	ease: Sine.inOut
}).to(dumbbell, 0.3, {});

const tlMoonFull = new TimelineMax({
	repeat: -1,
	paused: false
});
tlMoonFull.to(moonFull, 20, {
	rotation: 360,
	ease: Power0.easeNone,
	transformOrigin: "50% 50%"
});

const tlGalaxy = new TimelineMax({
	repeat: -1,
	yoyo: true,
	paused: false
});
tlGalaxy.to(galaxy, 5, {
	rotationX: -45,
	ease: Power0.easeNone
});

const tlPlanet2 = new TimelineMax({
	repeat: -1,
	yoyo: true,
	paused: false
});
tlPlanet2.to(planet2, 0.5, {
	x: 1,
	y: 1,
	ease: Power0.easeNone
});
const tlComet = new TimelineMax({
	repeat: -1,
	yoyo: true,
	paused: false
});
const tlCometTrail = new TimelineMax({
	repeat: -1,
	yoyo: true,
	paused: false
});
tlComet.to(comet, 0.15, {
	x: 1,
	y: 1,
	ease: Power0.easeNone
});
cometLines.forEach((el, i) => {
	const x2 = parseInt(el.getAttribute("x2")) - 10;
	const y2 = parseInt(el.getAttribute("y2")) - 10;
	let tl = new TimelineMax({
		repeat: -1,
		yoyo: true
	});
	tl.to(el, 1, {
		attr: {
			x2: x2,
			y2: y2
		},
		ease: Linear.easeNone
	});
	tlCometTrail.add(tl, i / 2);
});
const tlMoonCrescent = new TimelineMax({
	repeat: -1,
	yoyo: true,
	paused: false
});
tlMoonCrescent
	.to(moonCrescent, 2, {
		rotation: 5,
		ease: Power0.easeNone
	})
	.to(moonCrescent, 2, {
		rotation: -5,
		ease: Power0.easeNone
	});
const tlConstellation = new TimelineMax({
	repeat: -1,
	paused: false
});
constellationStars.forEach((el, i) => {
	var tl = new TimelineMax({
		repeat: -1,
		yoyo: true
	});
	tl.to(el, 1, {
		opacity: 0.3,
		ease: Linear.easeNone
	});
	tlConstellation.add(tl, i);
});
function checkStatus() {
	if (checkBox.checked) {
		animated = true;
		startAnimation();
	} else {
		animated = false;
		stopAnimation();
	}
}
function startAnimation() {
	tlKeyboard?.play();
	tlHeadphones?.play();
	tlFryingPan?.play();
	tlDumbbell?.play();
	tlMoonFull?.play();
	tlMoonCrescent?.play();
	tlPlanet2?.play();
	tlGalaxy?.play();
	tlComet?.play();
	tlCometTrail?.play();
	tlConstellation?.play();
	planet2DrawTl?.play();
	moonFullDrawTl?.play();
	moonCrescentDrawTl?.play();
	galaxyDrawTl?.play();
	constellationDrawTl?.play();
	cometDrawTl?.play();
}
function stopAnimation() {
	tlKeyboard?.pause();
	tlHeadphones?.pause();
	tlFryingPan?.pause();
	tlDumbbell?.pause();
	tlMoonFull?.pause();
	tlMoonCrescent?.pause();
	tlPlanet2?.pause();
	tlGalaxy?.pause();
	tlComet?.pause();
	tlCometTrail?.pause();
	tlConstellation?.pause();
	planet2DrawTl?.pause();
	moonFullDrawTl?.pause();
	moonCrescentDrawTl?.pause();
	galaxyDrawTl?.pause();
	constellationDrawTl?.pause();
	cometDrawTl?.pause();
}

const planet2Draw = document.querySelectorAll("#planet-2 .drawPath");
const planet2DrawTl = new TimelineMax({
	repeat: -1,
	yoyo: true,
	paused: false
});
planet2Draw.forEach((path, i) => {
	const tl = new TimelineMax({
		repeatDelay: 25,
		delay: 45
	});
	tl.to(path, 3, {
		drawSVG: "0%"
	});
	planet2DrawTl.add(tl, i);
});
const cometDraw = document.querySelectorAll("#comet .drawPath");
const cometDrawTl = new TimelineMax({
	repeat: -1,
	yoyo: true,
	paused: false
});
cometDraw.forEach((path, i) => {
	const tl = new TimelineMax({
		repeatDelay: 10,
		delay: 25
	});
	tl.to(path, 3, {
		drawSVG: "0%"
	});
	cometDrawTl.add(tl, i);
});
const moonFullDraw = document.querySelectorAll("#moon-full .drawPath");
const moonFullDrawTl = new TimelineMax({
	repeat: -1,
	yoyo: true,
	paused: false
});
moonFullDraw.forEach((path, i) => {
	const tl = new TimelineMax({
		repeatDelay: 30,
		delay: 35
	});
	tl.to(path, 3, {
		drawSVG: "0%"
	});
	moonFullDrawTl.add(tl, i);
});
const galaxyDraw = document.querySelectorAll("#comet .drawPath");
const galaxyDrawTl = new TimelineMax({
	repeat: -1,
	yoyo: true,
	paused: false
});
galaxyDraw.forEach((path, i) => {
	const tl = new TimelineMax({
		repeatDelay: 35,
		delay: 55
	});
	tl.to(path, 3, {
		drawSVG: "0%"
	});
	galaxyDrawTl.add(tl, i);
});
const moonCrescentDraw = document.querySelectorAll("#moon-crescent .drawPath");
const moonCrescentDrawTl = new TimelineMax({
	repeat: -1,
	yoyo: true,
	paused: false
});
moonCrescentDraw.forEach((path, i) => {
	const tl = new TimelineMax({
		repeatDelay: 22,
		delay: 65
	});
	tl.to(path, 3, {
		drawSVG: "0%"
	});
	moonCrescentDrawTl.add(tl, i);
});
const constellationDraw = document.querySelectorAll("#constellation .drawPath");
const constellationDrawTl = new TimelineMax({
	repeat: -1,
	yoyo: true,
	paused: false
});
constellationDraw.forEach((path, i) => {
	const tl = new TimelineMax({
		repeatDelay: 28,
		delay: 28
	});
	tl.to(path, 3, {
		drawSVG: "0%"
	});
	constellationDrawTl.add(tl, i);
});
