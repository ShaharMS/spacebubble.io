function markSections() {
    let elements = document.querySelectorAll("[under-construction]");
    console.log(elements);
    for (let e of elements) {
        e.ariaDisabled = true
        let t = document.createElement('h1');
        let b = getBounds(e);
        t.innerText = "Under Construction 🛠️";

        t.style.position = "absolute";
        t.style.top = b.y + "px";
        t.style.left = b.x + "px";
        t.style.width = b.width + "px";
        t.style.height = b.height * 3 / 4 - 16 + "px";

        t.style.marginTop = "0px";
        t.style.paddingTop = b.height / 4 + "px";

        t.style.textAlign = "center";
        t.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        t.style.color = "black";
        t.style.fontSize = "6em";
        t.style.fontWeight = "800";

        document.body.appendChild(t);

        let t2 = document.createElement("h2");
        t2.innerText = "Don't worry, I'll be up and running soon :)";

        t2.style.position = "absolute";
        t2.style.top = "calc(" + b.y + "px + 3em + " + b.height / 2 + "px)";
        t2.style.left = b.x + "px";
        t2.style.width = b.width + "px";
        t2.style.textAlign = "center";

        document.body.appendChild(t2);

        window.addEventListener("resize", () => {

            let b = getBounds(e);

            t.style.top = b.y + "px";
            t.style.left = b.x + "px";
            t.style.width = b.width + "px";
            t.style.height = b.height * 3 / 4 - 16 + "px";

            t.style.marginTop = "0px";
            t.style.paddingTop = b.height / 4 + "px";


            t2.style.top = "calc(" + b.y + "px + 3em + " + b.height / 2 + "px)";
            t2.style.left = b.x + "px";
            t2.style.width = b.width + "px";
        });
    }
}

if (location.href.includes("spacebubble")) markSections(); // only display in production

function getBounds(el) {
    const rect = el.getBoundingClientRect();
    return {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height
    };
}