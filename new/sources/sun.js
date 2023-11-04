let sun = document.getElementsByClassName("sun-icon")[0];
let section3 = document.getElementById("section-3");

let secretContainer = document.createElement("div");
secretContainer.innerHTML =
	`<div class="secret">
		<h4>Secret In&hellip;&nbsp; <h4>
		<h4 class="secret-counter"></h4>
	</div>`;

secretContainer.setCss({
	position: "absolute",
	top: "200vh",
	right: "0",
	opacity: "0.5",
	display: "none",
	width: "calc(var(--sun-radius) / 3 * 2)",
	textAlign: "center",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	fontSize: "2em",
});

sun.insertAdjacentElement("afterend", secretContainer);

section3.addEventListener("mousemove", (e) => {
	// if the mousepoint overlaps the sun, dispatch its hovering css & js events
	let mx = e.clientX;
	let my = e.clientY;
	let sx = sun.getBoundingClientRect().x + sun.getBoundingClientRect().width / 2;
	let sy = sun.getBoundingClientRect().y + sun.getBoundingClientRect().height / 2;
	if (Math.sqrt((mx - sx) * (mx - sx) + (my - sy) * (my - sy)) < 160) {
		sun.dispatchEvent(new Event("mouseover"));
		sun.classList.add("hover");
		secretContainer.style.display = "flex";
	} else {
		sun.classList.remove("hover");
		secretContainer.style.display = "none";
	}
});

sun.addEventListener("mouseenter", (e) => {
	sun.classList.add("hover");
});
sun.addEventListener("mouseout", () => {
	sun.classList.remove("hover");
});

