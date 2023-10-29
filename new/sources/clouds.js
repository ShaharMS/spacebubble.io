const randomVelocity = () => Math.max(0.2, Math.random()) / 2;
const randomHeight = (height) => Math.random() * height;
const randomStartPosition = (width) => Math.random() * width;
const getTime = (width) => width * 15;

let timerDone = false;
const shouldCreateCloud = (width) => {
    if (Math.random() > 0.9 && timerDone) {
        timerDone = false;
        setTimeout(() => timerDone = true, getTime(width));

        return true;
    }
    return false;
};

let container = document.getElementsByClassName("cloud-container")[0];
setTimeout(() => timerDone = true, getTime(container.getBoundingClientRect().width));

for (let i = 0; i < Math.ceil(container.getBoundingClientRect().width / 200); i++) {
    let cloud = document.createElement("div");
    cloud.classList.add("cloud");
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
        cloud.style.top = randomHeight(container.getBoundingClientRect().height) + "px";
        cloud.style.left = "-200px";
        cloud.setAttribute("velocity", randomVelocity());
        container.appendChild(cloud);
    }
    requestAnimationFrame(run);
}


requestAnimationFrame(run);
