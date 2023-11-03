let timerDone = false;
let counter = Math.floor(Math.random() * 8);
let container = document.getElementsByClassName("cloud-container")[0];


const randomVelocity = () => Math.max(0.2, Math.random()) / 2;
const randomHeight = (height) => Math.random() * height;
const randomStartPosition = (width) => Math.random() * width;
const getTime = (width) => width * 15;
const shouldCreateCloud = (width) => {
    if (Math.random() > 0.9 && timerDone) {
        timerDone = false;
        setTimeout(() => timerDone = true, getTime(width));

        return true;
    }
    return false;
};
const cloudContent = () => {
	let array = [
		"This website had about 5 redesigns in total since its creation 😅",
		"Making pretty much everything since like 3 years ago",
		"Major thanks to Ohad for helping me design this <sophisticated>masterpiece</sophisticated>",
		"I̸͈̗͑̔̍̒̃ ̷̨͔͐̈̃̅͠l̷͈̬̒͑į̷̦̜͖̙̈́͊k̵̬̗͚̳̔͒́̂ͅe̶̳͂͝ ̸̩̪̦̪̙̍h̵̳̺͆̅a̷̱͌͛m̴̰͕̹͌̆b̵̠̉͐̓̐ų̷̑̃͂ŕ̶̞͚̒̋g̶̡͉̝̙̍̎͛e̶͍͎̾r̴̨̝̘̝͈̈́̀̉ŝ̵͍͈",
		"Made with Love ❤️",
		"Have you listened to Kendrick Lamar's <italic>'To Pimp A Butterfly'</italic>?",
		"Follow me on <a href='https://twitter.com/MarcusShahar'>Twitter</a> For <italic>absolutely nothing</italic>!",
		"<div style=\"padding-left: 20px\">This is slightly misaligned.<br> Cry about it 😊.</div>",
		`"<img style="position: relative; top: 12px; width: 32px; height: 20px" class="emojidex-emoji" src="https://cdn.emojidex.com/emoji/seal/TrollFace.png" emoji-code="TrollFace" alt="TrollFace"/>"<br><br>God, Genesis 11.7`
	];
	return '<div style="position: relative; top: -10px; width: 80%";>' + array[counter++ % array.length] + '</div>';
}

setTimeout(() => timerDone = true, getTime(container.getBoundingClientRect().width));

for (let i = 0; i < Math.ceil(container.getBoundingClientRect().width / 200); i++) {
    let cloud = document.createElement("div");
    cloud.classList.add("cloud");
	cloud.innerHTML = cloudContent();
    cloud.style.top = randomHeight(container.getBoundingClientRect().height - 20) + 20 + "px";
    cloud.style.left = randomStartPosition(container.getBoundingClientRect().width) + "px";
    cloud.setAttribute("velocity", randomVelocity());
    container.appendChild(cloud);
}

function run() {
    let clouds = container.getElementsByClassName("cloud");
    for (const cloud of clouds) {
        if (cloud.getBoundingClientRect().x > container.getBoundingClientRect().x + container.getBoundingClientRect().width) {
            container.removeChild(cloud);
        } else {
            cloud.style.left = +parseFloat(cloud.style.left) + +cloud.getAttribute("velocity") + "px";
        }
    }

    if (shouldCreateCloud(container.getBoundingClientRect().width)) {
        let cloud = document.createElement("div");
        cloud.classList.add("cloud");
		cloud.innerHTML = cloudContent();
        cloud.style.top = randomHeight(container.getBoundingClientRect().height) + "px";
        cloud.style.left = "-200px";
        cloud.setAttribute("velocity", randomVelocity());
        container.appendChild(cloud);
    }
    requestAnimationFrame(run);
}


requestAnimationFrame(run);
