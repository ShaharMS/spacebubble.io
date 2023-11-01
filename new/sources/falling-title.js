function runFallingTitle() {


	const Engine = Matter.Engine,
		Render = Matter.Render,
		Runner = Matter.Runner,
		Bodies = Matter.Bodies,
		Composite = Matter.Composite,
		World = Matter.World,
		Mouse = Matter.Mouse,
		MouseConstraint = Matter.MouseConstraint;

	const engine = Engine.create();
	engine.gravity.y = 10;
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
	const section3Elements = section3.children;
	let bodies = [];

	let titleBody = null;

	console.log(section3Elements);

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

		let bounds = element.getBoundingClientRect();
		bounds.y += window.scrollY;

		if (element.id != "section-3-title") {
			var body = Matter.Bodies.fromVertices(bounds.x, bounds.y, vertices, {
				isStatic: true,
			});
			Matter.Body.setStatic(body);
			bodies.push(body);
		}
		else {
			titleBody = Matter.Bodies.fromVertices(bounds.x, bounds.y, vertices, {
				isStatic: false,
				frictionAir: 0.01
			});
			bodies.push(titleBody)
		}
	}

	let titleBounds = document.getElementById("section-3-title").getBoundingClientRect();

	let mouse = Mouse.create(section3),
		mouseConstraint = MouseConstraint.create(engine, {
			mouse: mouse,
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false
				},
				//pointA: { x: titleBounds.x, y: titleBounds.y },
    			//bodyB: titleBody,
			}
	});
	render.mouse = mouse;

	Composite.add(world, mouseConstraint);


	Composite.add(world, bodies);


}