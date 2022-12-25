var Highlighter = function () { };

Highlighter.main = function () {
	let element = window.document.getElementById("code");
	let pos = getCaretPosition(element);
	element.innerHTML = Highlighter.syntaxHighlight(element.innerText);
	setCaretPosition(element, pos);
};

Highlighter.syntaxHighlight = function (html) {
	var keywords1 = ["import", "continue", "else", "for", "return", "while", "as", "if"];
	var keywords1EReg = new RegExp("\\b(" + keywords1.join("|") + ")\\b", "g");
	var keywords2 = ["this", "print", "class", "extern", "action", "new", "hide", "public", "global", "true", "false", "nothing", "define"];
	var keywords2EReg = new RegExp("\\b(" + keywords2.join("|") + ")\\b", "g");
	var types = new RegExp("\\b([A-Z][a-zA-Z0-9]*)\\b", "g");
	var functions = new RegExp("\\b([a-zA-Z0-9_]+)\\s*\\(", "g");
	//replace keywords
	html = html.replace(keywords2EReg, "<span class='kwd1'>$1</span>");
	html = html.replace(keywords1EReg, "<span class='kwd'>$1</span>");
	html = html.replace(types, "<span class='type'>$1</span>");
	html = html.replace(functions, "<span class='func'>$1</span>(");
	html = html.replace(new RegExp("(\"[^\"]*\")", "g"), "<span class='str'>$1</span>");
	html = html.replace(new RegExp("(//.+?)(\n|$)", "g"), "<span class='cmt'>$1</span>$2")
	html = html.replace(new RegExp("(/\\*\\*?(.|\n)+?\\*?\\*/)", "g"), "<span class='cmt'>$1</span>")
	return html;
};

/**
 * Gets the caret position within an element.
 * @param {HTMLElement} element The element to get the caret position from.
 * @return {number} The caret position (index) within the element.
 */
function getCaretPosition(element) {
	const selection = window.getSelection();
	if (!selection.anchorNode) {
	  return -1;
	}
	let caretPosition = 0;
	const iterator = document.createNodeIterator(element, NodeFilter.SHOW_TEXT);
	let currentNode;
	while (currentNode = iterator.nextNode()) {
	  if (currentNode === selection.anchorNode) {
		caretPosition += selection.anchorOffset;
		break;
	  } else {
		caretPosition += currentNode.textContent.length;
	  }
	}
	return caretPosition;
  }
  
  /**
   * Sets the caret position within an element.
   * @param {HTMLElement} element The element to set the caret position in.
   * @param {number} position The caret position (index) to set within the element.
   */
  function setCaretPosition(element, position) {
	let currentPosition = 0;
	let found = false;
	const iterator = document.createNodeIterator(element, NodeFilter.SHOW_TEXT);
	let currentNode;
	while (currentNode = iterator.nextNode()) {
	  if (currentPosition + currentNode.textContent.length >= position) {
		const range = document.createRange();
		range.setStart(currentNode, position - currentPosition);
		range.collapse(true);
		const selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
		found = true;
		break;
	  }
	  currentPosition += currentNode.textContent.length;
	}
	if (!found) {
	  throw new Error(`Caret position ${position} is out of range.`);
	}
  }