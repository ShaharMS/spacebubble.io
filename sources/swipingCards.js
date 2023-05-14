var cards = document.body;


const setDotsUp = (element) => {
    cards = element;
    let tray = document.createElement('div');
    tray.id = "card-control-tray";
    element.parentNode.insertBefore(tray, element.nextSibling); // Because tray.insertAfter(element) doesnt exist
    for (let i = 0; i < element.childElementCount; i++) {
        let dot = document.createElement('div');
        dot.className = "dot";
        tray.appendChild(dot);
    }
    tray.innerHTML = `<div id="tray_backwards" class="arrow-left"></div>` + tray.innerHTML;
    tray.innerHTML += `<div id="tray_forwards" class="arrow-right"></div>`;
    tray.style = "display: flex; align-items: center; justify-content: center;";
}

const sineTween = (element, x, duration) => {
    const startingPosition = element.offsetLeft;
    const distance = x;
    const frequency = 2 * Math.PI / duration; // number of cycles per second
    let startTime;
  
    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progress = Math.sin(elapsedTime * frequency);
      const newPosition = startingPosition + progress * distance;
      element.style.left = newPosition + 'px';
      if (elapsedTime < duration) {
        requestAnimationFrame(animate);
      }
    }
  
    requestAnimationFrame(animate);
  }

const arrows = () => {
    let forward = document.getElementById('tray_forwards');
    let backward = document.getElementById('tray_backwards');
    
    var currentCard = 0; // dot index
    var changed = false;
    var dots = forward.parentElement.getElementsByClassName('dot');

    let previous = dots.item(currentCard);
    previous.classList.add("highlighted");

    forward.addEventListener('click', (_) => {
        changed = true;
        let previous =  dots.item(currentCard);
        previous.classList.remove("highlighted");
        
        currentCard++;
        if (currentCard >= dots.length) {
            currentCard = 0;
            // let old = cards.style.transition;
            // cards.style.transition = "none";
            // cards.offsetHeight; // forces the browser to set pending html changes, thus always getting an accurate transition.
            // cards.style.left = "0";
            // cards.style.transition = old;
            // let card = cards.getElementsByClassName("card").item(dots.length - 1);
            // cards.prepend(card);
        }
        let current = dots.item(currentCard);
        current.classList.add("highlighted");
        cards.style.left = `-${90 * currentCard}vw`;

    });

    setInterval(() => {if (!changed) forward.dispatchEvent(new Event('click'));}, 5000);
    

    backward.addEventListener('click', (_) => {
        changed = true;
        let current =  dots.item(currentCard);
        current.classList.remove("highlighted");
        
        currentCard--;
        if (currentCard < 0) {
            currentCard = dots.length - 1;
            cards.style.left = `${90 * dots.length}vw`;
        }
        let previous = dots.item(currentCard);
        previous.classList.add("highlighted");
        cards.style.left = `-${90 * currentCard}vw`;

    });
}

setDotsUp(document.getElementById('cards'));
arrows();