const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

const engine = Engine.create();
const world = engine.world;

let section3 = document.getElementById("section-3");

const render = Render.create({
	element: section3,
	engine: engine,
	options: {
		width: window.innerWidth,
		height: window.innerHeight,
		wireframes: false,
		background: "transparent"
	}
});

// get the elements from section-3, all of them should be static rigid bodies
const section3Elements = document.querySelectorAll("#section-3");
let bodies = [];

for (const element of section3Elements) {
	let rigid = Bodies.static(element);
	bodies.push(rigid);
}