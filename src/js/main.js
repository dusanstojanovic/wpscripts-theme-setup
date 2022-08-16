/*---------------------------------------
    Responsive Embeds (from twentytwentyone)
---------------------------------------*/
function twentytwentyoneResponsiveEmbeds() {
	let proportion, parentWidth;
	// Loop iframe elements.
	document.querySelectorAll('iframe').forEach(function (iframe) {
		// Only continue if the iframe has a width & height defined.
		if (iframe.width && iframe.height) {
			// Calculate the proportion/ratio based on the width & height.
			proportion = parseFloat(iframe.width) / parseFloat(iframe.height);
			// Get the parent element's width.
			parentWidth = parseFloat(window.getComputedStyle(iframe.parentElement, null).width.replace('px', ''));
			// Set the max-width & height.
			iframe.style.maxWidth = '100%';
			iframe.style.maxHeight = Math.round(parentWidth / proportion).toString() + 'px';
		}
	});
}
// Run on initial load.
twentytwentyoneResponsiveEmbeds();
// Run on resize.
window.onresize = twentytwentyoneResponsiveEmbeds;
