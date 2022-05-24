// highlighter adapted/modified from code.haxe.org
(function (console) { "use strict";
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
};
var Highlighter = function() { };
Highlighter.main = function() {
	var _g = 0;
	var _g1 = window.document.body.querySelectorAll("pre code");
	while(_g < _g1.length) {
		var el = _g1[_g];
		++_g;
		if(!Highlighter.hasClass(el,"highlighted")) {
			el.innerHTML = Highlighter.syntaxHighlight(el.innerHTML);
			el.className += " highlighted";
		}
	}
};
Highlighter.hasClass = function(el,className) {
	return el.className.indexOf(className) != -1;
};
Highlighter.syntaxHighlight = function(html) {
	var keywords1 = ["import","break","case","cast","continue","default","else","for","return","switch","throw","try","using","while","as","if"];
	var keywords1EReg = new EReg("\\b(" + keywords1.join("|") + ")\\b","g");
	var keywords2 = ["this","abstract","trace","cast","class","dynamic","enum","extends","extern","function","implements","inline","interface","macro","new","override","package","private","public","static","typedef","true","false","null","untyped","var","final","super"];
	var keywords2EReg = new EReg("\\b(" + keywords2.join("|") + ")\\b","g");
	var types = new EReg("\\b([A-Z][a-zA-Z0-9]*)\\b","g");
	var functions = new EReg("\\b([a-zA-Z0-9_]+)\\s*\\(","g");
	html = keywords2EReg.replace(html,"<span class='kwd1'>$1</span>");
	html = keywords1EReg.replace(html,"<span class='kwd'>$1</span>");
	html = types.replace(html,"<span class='type'>$1</span>");
	html = functions.replace(html,"<span class='func'>$1</span>(");
	html = new EReg("(\"[^\"]*\")","g").replace(html,"<span class='str'>$1</span>");
	html = new EReg("(//.+?)(\n|$)","g").replace(html,"<span class='cmt'>$1</span>$2");
	html = new EReg("(/\\*\\*?(.|\n)+?\\*?\\*/)","g").replace(html,"<span class='cmt'>$1</span>");
	return html;
};
Highlighter.main();
})(typeof console != "undefined" ? console : {log:function(){}});
