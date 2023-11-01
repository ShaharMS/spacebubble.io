let plane = document.getElementById("plane");

plane.onmessagestartexit = () => {
	console.log("start exit");
	let container = plane.children[1].cloneNode(true);
	console.log(container);

	let section3 = document.getElementById("section-3");

	section3.prepend(container);
	console.log(container.getBoundingClientRect());

	container.style.position = "absolute";
	container.style.top = plane.getBoundingClientRect().y + window.scrollY + "px";
	container.style.right = "0px";
	container.style.scale = 0.3;

	container.setAttribute("acceleration", 0.2);
	container.setAttribute("velocity", 0);

	const fall = () => {
		container.setAttribute("velocity", parseFloat(container.getAttribute("velocity")) + parseFloat(container.getAttribute("acceleration")));
		container.style.top = parseFloat(container.style.top) + parseFloat(container.getAttribute("velocity")) + "px";
		if (parseFloat(container.style.top) < window.innerHeight * 3 - container.getBoundingClientRect().height * 3) requestAnimationFrame(fall);
	}

	fall();
};

