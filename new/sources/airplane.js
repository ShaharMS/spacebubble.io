/**
 * 
 * @param {HTMLDivElement} plane 
 * @param {Number} velocity 
 */
const runPlane = (plane, velocity) => {
	if (!plane.getAttribute("ran")) plane.setAttribute("ran", "true");
	plane.style.right = `calc(${plane.style.right} + ${velocity}px)`;
	if (!plane.getAttribute("exited") && plane.getBoundingClientRect().x < 0 && plane.onscreenexit != null) {
		plane.setAttribute("exited", "true");
		plane.onscreenexit();
	}
	if (!plane.getAttribute("messageStartExit") && (plane.getBoundingClientRect().x + plane.children[0].getBoundingClientRect().width) < 0 && plane.onmessagestartexit != null) {
		plane.setAttribute("messageStartExit", "true");
		plane.onmessagestartexit();
	}
	if (!plane.getAttribute("messageExited") && (plane.getBoundingClientRect().x + plane.getBoundingClientRect().width) < 0 && plane.onmessageexit != null) {
		plane.setAttribute("messageExited", "true");
		plane.onmessageexit();
		plane.parentElement.removeChild(plane);
		return;
	}

	requestAnimationFrame(() => runPlane(plane, velocity));
}


let planes = document.getElementsByClassName("airplane");

let p_i = 0;
const id = () => p_i++;

for (const plane of planes) {
	const text = plane.innerHTML;
	const velocity = parseFloat(plane.getAttribute("velocity") ?? window.innerWidth / 800);
	const stop = parseFloat(plane.getAttribute("distance") ?? -1);

	let graphic = document.createElement("img");
	graphic.src = "../assets/plane-demo.svg";
	graphic.style.padding = "0";
	graphic.style.margin = "0";
	// remove all children
	plane.innerHTML = "";
	plane.style.display = "flex";
	plane.style.alignItems = "center";

	plane.style.position = "absolute";

	plane.appendChild(graphic);


	graphic.onload = () => {

		let graphicBounds = graphic.getBoundingClientRect();
		graphicBounds.y += window.scrollY;

		let planeBounds = plane.getBoundingClientRect();
		planeBounds.y += window.scrollY;
		planeBounds.height /= plane.style.scale;

		plane.style.right = `calc(-100% - ${planeBounds.width}px)`;


		let container = document.createElement("div");
		let customClass = "plane-content" + id();
		container.classList.add(customClass);
		container.innerHTML = text;
		container.style.backgroundColor = "rgba(255, 255, 255)";
		container.style.display = "flex";
		let css = `
		.${customClass} * {
			padding-left: 5px !important;
		}`;
		let cssStyle = document.createElement("style");
		cssStyle.innerHTML = css;
		document.head.appendChild(cssStyle);
		plane.appendChild(container);

		if (!plane.getAttribute("ran")) {
			requestAnimationFrame(() => {
				runPlane(plane, velocity);
			});
		}
	}
}

console.log(planes);