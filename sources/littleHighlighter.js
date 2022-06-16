var Highlighter = function() { };
Highlighter.main = function() {
	var element = window.document.getElementById("code");
	element.innerText = Highlighter.syntaxHighlight(element.value);
};
Highlighter.syntaxHighlight = function(html) {
	var keywords1 = ["import","continue","else","for","return","while","as","if"];
	var keywords1EReg = new RegExp("\\b(" + keywords1.join("|") + ")\\b","g");
	var keywords2 = ["this","print","class","extern","action","new","hide","public","global","true","false","nothing","define"];
	var keywords2EReg = new RegExp("\\b(" + keywords2.join("|") + ")\\b","g");
	var types = new RegExp("\\b([A-Z][a-zA-Z0-9]*)\\b","g");
	var functions = new RegExp("\\b([a-zA-Z0-9_]+)\\s*\\(","g");
	//replace keywords
	html = html.replace(keywords2EReg, "<span class='kwd1'>$1</span>");
	html = html.replace(keywords1EReg,"<span class='kwd'>$1</span>");
	html = html.replace(types,"<span class='type'>$1</span>");
	html = html.replace(functions,"<span class='func'>$1</span>(");
	html = html.replace(new RegExp("(\"[^\"]*\")","g") ,"<span class='str'>$1</span>");
	html = html.replace(new RegExp("(//.+?)(\n|$)","g"), "<span class='cmt'>$1</span>$2")
	html = html.replace(new RegExp("(/\\*\\*?(.|\n)+?\\*?\\*/)","g"), "<span class='cmt'>$1</span>")
	return html;
};
