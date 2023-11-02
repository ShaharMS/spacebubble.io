let plane = document.getElementById("plane");

plane.onmessagestartexit = () => {
	console.log("start exit");
	let container = plane.children[1].cloneNode(true);
	console.log(container);

	let section3 = document.getElementById("section-3");

	plane.insertAdjacentElement("afterend", container);
	console.log(container.getBoundingClientRect());

	container.style.position = "absolute";
	container.style.right = `calc(${plane.style.right} + ${plane.children[0].getBoundingClientRect().width}px + 20px)`;
	container.style.top = plane.getBoundingClientRect().y + window.scrollY - plane.getBoundingClientRect().height + "px";
	container.style.scale = 0.3;

	container.setAttribute("acceleration", 0.2);
	container.setAttribute("velocity", 0);

	let rope1 = document.createElement("div");
	let rope2 = document.createElement("div");


	const createRopes = () => {

		for (const rope of [rope1, rope2]) {
			rope.classList.add("rope");
			rope.style.position = "absolute";
			rope.style.top = window.innerHeight * 1.301 + "px";
			rope.setAttribute("velocity", 20);
			rope.setAttribute("acceleration", -0.5);
			container.insertAdjacentElement("afterend", rope);
		}

		rope1.style.left = 10 + "px";
		rope2.style.left = container.getBoundingClientRect().width - rope2.getBoundingClientRect().width - 10 + "px";
	}

	const fall = () => {
		container.setAttribute("velocity", parseFloat(container.getAttribute("velocity")) + parseFloat(container.getAttribute("acceleration")));
		container.style.top = parseFloat(container.style.top) + parseFloat(container.getAttribute("velocity")) + "px";
		if (parseFloat(container.style.top) < window.innerHeight * 3 - container.getBoundingClientRect().height * 3) requestAnimationFrame(fall);
	}
	const ropeCatch = () => {
		for (const rope of [rope1, rope2]) {
			rope.setAttribute("velocity", parseFloat(rope.getAttribute("velocity")) + parseFloat(rope.getAttribute("acceleration")));
			rope.style.top = parseFloat(rope.style.top) + parseFloat(rope.getAttribute("velocity")) + "px";
		}
		if (parseFloat(container.style.top) < parseFloat(rope1.style.top) + window.innerHeight * 0.7) {
			container.setAttribute("velocity", rope1.getAttribute("velocity"));
			container.setAttribute("acceleration", rope1.getAttribute("acceleration"));
		}
		if (parseFloat(rope1.style.top) > window.innerHeight * 1.3) requestAnimationFrame(ropeCatch);
		else {
			container.setAttribute("velocity", 0);
			container.setAttribute("acceleration", 0);
		}
	}

	createRopes();
	fall();
	ropeCatch();
};

