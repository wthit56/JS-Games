var canvas = document.createElement("CANVAS");
if (!canvas.getContext || !(canvas.context = canvas.getContext("2d"))) {
	canvas = false;
}
else {
	var viewportChange;
	setTimeout(function() {
		var w, h, r, n;
		if (canvas.full) {
			viewportChange = function() {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
				if (canvas.onreset) {
					canvas.onreset();
				}
			};
		}
		else {
			canvas.ratio = canvas.width / canvas.height;
			
			canvas.style.transform = "translateZ(0)";
			if (canvas.style.transform) {
				canvas.style.transformOrigin = "0 0";
				document.body.style.overflow = "hidden";
				
				viewportChange = function() {
					w = window.innerWidth; h = window.innerHeight; r = w / h;
					if (r <= canvas.ratio) { // tall
						n = w / canvas.width;
						canvas.style.transform = "translate3d(0," + ((h - (canvas.height * n)) / 2) + "px,0) scale(" + n + ")";
					}
					else { // wide
						n = h / canvas.height;
						canvas.style.transform = "translate3d(" + ((w - (canvas.width * n)) / 2) + "px,0,0) scale(" + n + ")";
					}
				};
			}
			else {
				canvas.style.position = "absolute";
				viewportChange = function() {
					w = window.innerWidth; h = window.innerHeight; r = w / h;
					if (r <= canvas.ratio) { // tall
						n = canvas.height * (w / canvas.width);
						canvas.style.width = w + "px";
						canvas.style.height = n + "px";
						
						canvas.style.left = 0;
						canvas.style.top = ((h - n) / 2) + "px";
					}
					else {
						canvas.style.height = h + "px";
						n = (canvas.width * (h / canvas.height));
						canvas.style.width = n + "px";
						
						canvas.style.left = ((w - n) / 2) + "px";
						canvas.style.top = 0;
					}
				};
			}
		}
		
		viewportChange();
		if (requestAnimationFrame) {
			window.addEventListener("resize", function() {
				requestAnimationFrame(viewportChange);
			});
		}
		else {
			window.addEventListener("resize", viewportChange);
		}
		
		document.body.appendChild(canvas);
	}, 0);
	
}
