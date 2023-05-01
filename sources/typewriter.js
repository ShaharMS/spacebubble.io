

const iSpeed = 20; // time delay of print out
const iScrollAt = 20; // start scrolling up at this many lines


var observer = new IntersectionObserver(observerCallback);

function observerCallback(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains("__highlighted")) {
            // set up text to print, each item in array is new line
            let aText = [entry.target.innerText];
            let iArrLength = aText[0].length; // the length of the text array

            let iTextPos = 0; // initialise text position
            let sContents = ''; // initialise contents variable
            let iRow; // initialise current row
            let iIndex = 0; // start printing array at this posision

            var typewriter = () => {
                sContents = ' ';
                iRow = Math.max(0, iIndex - iScrollAt);
                let destination = entry.target;

                while (iRow < iIndex) {
                    sContents += aText[iRow++] + '<br />';
                }
                destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "<flash style=\"margin-inline:2px\">|</flash>";
                if (iTextPos++ == iArrLength) {
                    iTextPos = 0;
                    iIndex++;
                    if (iIndex != aText.length) {
                        iArrLength = aText[iIndex].length;
                        setTimeout(typewriter, 500);
                    }
                } else {
                    setTimeout(typewriter, iSpeed);
                }
            }
            
            typewriter();
            entry.target.classList.add("__highlighted");
        }
    });
};

document.querySelectorAll(".highlight").forEach((e) => {
    observer.observe(e);
    console.log(e.innerHTML);
});
