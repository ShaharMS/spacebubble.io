
const pageState = {
    currentPage: null, //null means index.html
    setPage: setState,
    pullPage: pullCurrentState
}

function setState(pageName) {
    window.location.href = "/haxe/?name=" + pageName;
    pullCurrentState();
}

function pullCurrentState() {
    let pageName =  window.location.href.split('/').pop().replace("?name=", "");
    document.getElementById("article-body").innerHTML = getHTMLFrom(window.location.host + "/haxe/pages/" + pageName + ".html");
}