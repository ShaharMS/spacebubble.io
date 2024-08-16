let sun = document.getElementsByClassName("sun-icon")[0];
let section3 = document.getElementById("section-3");

let secretContainer = document.createElement("div");
secretContainer.innerHTML =
	`<div class="secret">
		<h4 id="secret-counter">Secret In&hellip;&nbsp; </h4>
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
	fontSize: window.innerWidth < 1000 ? "1em" : "2em",
	paddingTop: window.innerWidth < 1000 ? "1em" : "0em",
});
console.log(window.innerWidth);

sun.insertAdjacentElement("afterend", secretContainer);

section3.addEventListener("mousemove", (e) => {
	// if the mousepoint overlaps the sun, dispatch its hovering css & js events
	let mx = e.clientX;
	let my = e.clientY;
	let sx = sun.getBoundingClientRect().x + sun.getBoundingClientRect().width / 2;
	let sy = sun.getBoundingClientRect().y + sun.getBoundingClientRect().height / 2;
	if (Math.sqrt((mx - sx) * (mx - sx) + (my - sy) * (my - sy)) < 160) {
		if (!sun.classList.contains("hover"))
			sun.dispatchEvent(new Event("mouseenter"));
		sun.dispatchEvent(new Event("mouseover"));
		sun.classList.add("hover");
		secretContainer.style.display = "flex";
	} else {
		if (sun.classList.contains("hover"))
			sun.dispatchEvent(new Event("mouseout"));
		sun.classList.remove("hover");
		secretContainer.style.display = "none";
	}
});

let secretCounter = document.getElementById("secret-counter");
let t1, t2, t3, t4;
sun.addEventListener("mouseenter", (e) => {
	sun.classList.add("hover");

	t1 = setTimeout(() => {
		secretCounter.innerHTML = "Secret In&hellip;&nbsp; 3";
	}, 1000)
	t2 = setTimeout(() => {
		secretCounter.innerHTML = "Secret In&hellip;&nbsp; 2";
	}, 2000)
	t3 = setTimeout(() => {
		secretCounter.innerHTML = "Secret In&hellip;&nbsp; 1";
	}, 3000)
	t4 = setTimeout(() => {
		secretCounter.innerHTML = "Nice!";
		//Animation
	}, 4000)
});
sun.addEventListener("mouseout", () => {
	sun.classList.remove("hover");
	clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); 
	secretCounter.innerHTML = "Secret In&hellip;&nbsp; ";
});
