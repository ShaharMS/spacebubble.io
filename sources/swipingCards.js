
const setDotsUp = (element) => {
    let tray = document.createElement('div');
    tray.className += " card-control-tray";
    element.parentNode.insertBefore(tray, element.nextSibling); // Because tray.insertAfter(element) doesnt exist
    for (let i = 0; i < element.childElementCount; i++) {
        let dot = document.createElement('div');
        dot.className = "dot";
        tray.appendChild(dot);
    }
    tray.innerHTML = `<div id="tray_backwards" class="arrow-left"></div>` + tray.innerHTML;
    tray.innerHTML += `<div id="tray_forwards" class="arrow-right"></div>`;
    tray.style = "display: flex; align-items: center; gap: 10px; justify-content: center;";
}

const arrows = () => {
    let forward = document.getElementById('tray_forwards');
    let backward = document.getElementById('tray_backwards');
    
    var currentCard = 0; // dot index
    var dots = forward.parentElement.getElementsByClassName('dot');

    let previous = dots.item(currentCard);
    previous.classList.add("highlighted");

    forward.addEventListener('click', (_) => {
        console.log(currentCard);
        let previous =  dots.item(currentCard);
        previous.classList.remove("highlighted");
        
        currentCard++;
        if (currentCard >= dots.length) currentCard = 0;
        let current = dots.item(currentCard);
        current.classList.add("highlighted");
    });

    backward.addEventListener('click', (_) => {
        console.log(currentCard);
        let current =  dots.item(currentCard);
        current.classList.remove("highlighted");
        
        currentCard--;
        if (currentCard < 0) currentCard = dots.length - 1;
        let previous = dots.item(currentCard);
        previous.classList.add("highlighted");
    });
}

setDotsUp(document.getElementById('cards'));
arrows();