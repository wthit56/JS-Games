function viewport(dom) {
	var w = dom.width || dom.offsetWidth, h = dom.height || dom.offsetHeight, r = w / h;
	var w2, h2, r2, s;
	var pw, ph;
	function updateViewport() {
		w2 = window.innerWidth; h2 = window.innerHeight; r2 = w2 / h2;
		pw = 0; ph = 0;
		if (r > r2) { // pad top and bottom
			s = w2 / w;
			ph = (h2 - (h * s)) / 2;	
		}
		else /*if (r <= r2) */ { // pad left and right
			s = h2 / h;
			pw = (w2 - (w * s)) / 2;
		}
		dom.style.transform = "translate3d(" + pw + "px," + ph + "px,0px) scale(" + s + ")";
	}
	on(window, "resize", updateViewport);
	updateViewport();
}