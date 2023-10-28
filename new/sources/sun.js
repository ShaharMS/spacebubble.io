let sun = document.getElementsByClassName("sun-icon")[0];
let section3 = document.getElementById("section-3");

section3.addEventListener("mousemove", (e) => {
	// if the mousepoint overlaps the sun, dispatch its hovering css & js events
	let mx = e.clientX;
	let my = e.clientY;
	let sx = sun.getBoundingClientRect().x + sun.getBoundingClientRect().width / 2;
	let sy = sun.getBoundingClientRect().y + sun.getBoundingClientRect().height / 2;
	if (Math.sqrt((mx - sx) * (mx - sx) + (my - sy) * (my - sy)) < 160) {
		sun.dispatchEvent(new Event("mouseover"));
		sun.classList.add("hover");
	} else {
		sun.classList.remove("hover");
	}
});

sun.addEventListener("mouseover", () => {
	sun.classList.add("hover");
});
sun.addEventListener("mouseout", () => {
	sun.classList.remove("hover");
})