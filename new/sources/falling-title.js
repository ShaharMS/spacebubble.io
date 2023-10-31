
const Engine = Matter.Engine,
	Render = Matter.Render,
	Runner = Matter.Runner,
	Bodies = Matter.Bodies,
	Composite = Matter.Composite,
	World = Matter.World;

const engine = Engine.create();
engine.gravity = 10;
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


	let rectangles = Array.from(element.getClientRects());

	var vertices = [];
	for (var i = 0; i < rectangles.length; i++) {
		var rect = rectangles[i];
		vertices.push(
			{ x: rect.left, y: rect.top },
			{ x: rect.right, y: rect.top },
			{ x: rect.right, y: rect.bottom },
			{ x: rect.left, y: rect.bottom }
		);
	}

	if (element.id != "section-3-title") {
		var body = Matter.Bodies.fromVertices(x, y, vertices, {
			isStatic: true,
		});
		Matter.Body.setStatic(body);
		bodies.push(body); 
	}
	else {
		var body = Matter.Bodies.fromVertices(x, y, vertices, {
		});
		bodies.push(body)
	}
}

World.add(world, bodies);
