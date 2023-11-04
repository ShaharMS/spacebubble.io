/**
 * Sets the CSS style of an element.
 *
 * @param {HTMLElement} element - The element to set the CSS style for.
 * @param {string} css - The CSS style to apply to the element.
 */
HTMLElement.prototype.setCss = function(css) {
	this.style.cssText = css;
}

/**
 * Sets the CSS properties of an element.
 *
 * @param {HTMLElement} element - The element to set the CSS properties on.
 * @param {Object} cssObj - An object containing the CSS properties to set.
 */
HTMLElement.prototype.setCss = function(cssObj) {
	for (const [key, value] of Object.entries(cssObj)) {
		this.style[key] = value;
	}
}