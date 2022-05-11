var navContent = getHTMLFrom("/haxe/navbar.html");
function getHTMLFrom(path) {
    var request = new XMLHttpRequest();
    request.open("GET", path, false);
    request.send();
    return request.responseText;
}