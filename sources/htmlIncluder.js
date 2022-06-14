/**
 * This function is used to include other html files in a certine html element using the `include-html` attribute.
 */
function includeHTML() {
    var taggedElements, currentElement, path, request;
    taggedElements = document.getElementsByTagName("*");
    for (var i = 0; i < taggedElements.length; i++) {
        currentElement = taggedElements[i];
        /*search for elements with a certain atrribute:*/
        path = currentElement.getAttribute("include-html");
        if (path) {
            /* Make an HTTP request using the attribute value as the path name: */
            request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (this.readyState == 4) {
                    currentElement.innerHTML = this.responseText;
                    /* Remove the attribute, and call this function once more: */
                    currentElement.removeAttribute("include-html");
                    includeHTML();
                }
            }
            request.open("GET", path, true);
            request.send();
            return;
        }
    }
}

function getHTMLFrom(path) {
    console.log(path);
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send();
    return request.responseText;
}