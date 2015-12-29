var IO = {
	createCanvas: function() {
		var DOM;
		if ((DOM = document.createElement("CANVAS")) && DOM.getContext && (DOM.context = DOM.getContext("2d"))) {
			DOM.style.position = "absolute";
			DOM.width = DOM.height = 0;
			document.body.appendChild(DOM);
			
			return DOM;
		}
	}
};