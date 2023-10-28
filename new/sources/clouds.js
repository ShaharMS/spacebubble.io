const randomVelocity = () => Math.max(0.2, Math.random()) / 4;
const randomHeight = (height) => Math.random() * height;
const randomStartPosition = (width) => Math.random() * width;

let timerDone = false;
setTimeout(() => timerDone = true, 60000);
const shouldCreateCloud = () =>{
    if (Math.random() > 0.9 && timerDone) {
        timerDone = false;
        setTimeout(() => timerDone = true, 60000);

        return true;
    }
    return false;
};

let containers = document.getElementsByClassName("cloud-container");
for (const container of containers) {
    for (let i = 0; i < 3; i++) {
        let cloud = document.createElement("div");
        cloud.classList.add("cloud");
        cloud.style.top = randomHeight(container.getBoundingClientRect().height - 20) + 20 + "px";
        cloud.style.left = randomStartPosition(container.getBoundingClientRect().width) + "px";
        cloud.setAttribute("velocity", randomVelocity());
        container.appendChild(cloud);
    }
}
function run() {
    for (const container of containers) {
        let clouds = container.getElementsByClassName("cloud");
        for (const cloud of clouds) {
            if (cloud.getBoundingClientRect().x > container.getBoundingClientRect().x + container.getBoundingClientRect().width) {
                container.removeChild(cloud);
            } else {
                cloud.style.left = +parseFloat(cloud.style.left) + +cloud.getAttribute("velocity") + "px";
            }
        }

        if (shouldCreateCloud()) {
            let cloud = document.createElement("div");
            cloud.classList.add("cloud");
            cloud.style.top = randomHeight(container.getBoundingClientRect().height) + "px";
            cloud.style.left = "-200px";
            cloud.setAttribute("velocity", randomVelocity());
            container.appendChild(cloud);
        }
    }
    requestAnimationFrame(run);
}


requestAnimationFrame(run);
