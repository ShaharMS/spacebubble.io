let lastMouseX = 0; let lastMouseY = 0;
let section6 = document.getElementById("section-6");
let searchlight
/**
 * Updates the cursor position on the section-6 element.
 *
 * @param {Event} e - The event object containing the clientX and clientY coordinates.
 * @return {void} This function does not return a value.
 */
function update(e) {
    var rect = section6.getBoundingClientRect()
    if (e.type !== "scroll") {
        lastMouseX = e.clientX
        lastMouseY = e.clientY
    }
    var x = e.clientX || lastMouseX
    var y = e.clientY || lastMouseY
    x = x - rect.left
    y = y - rect.top
    section6.style.setProperty('--cursorX', x + 'px')
    section6.style.setProperty('--cursorY', y + 'px')

    //change angle of searchlights
}

section6.addEventListener('mousemove', update)
section6.addEventListener('touchmove', update)
window.addEventListener('scroll', update)
