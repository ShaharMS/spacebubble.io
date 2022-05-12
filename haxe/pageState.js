
const pageState = {
    currentPage: null, //null means index.html
    setPage: setState,
    pullPage: pullCurrentState
}

function setState(pageName) {
    window.location.assign(window.location.host + "/haxe/?name=" + pageName);
    getCurrentState();
}

function pullCurrentState() {
    let pageName =  window.location.href.split('/').pop();
    pageName = pageName.replace("?name=", "");
    document.getElementById("article").innerHTML = getHTMLFrom(window.location.host + "/haxe/pages/" + pageName + ".html");
}