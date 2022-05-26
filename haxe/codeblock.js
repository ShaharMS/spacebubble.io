const titleBar = (language) => ``

var elements = document.getElementsByClassName("programming");
for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    element.style.margin = 0;
    element.innerHTML = titleBar("Haxe") + element.innerHTML;
}