var loadImage = (function() {
	if (typeof Image === "undefined") { Image = require("./tests/image.js"); }
	
	var findF = /%f/;
	function loadImage(template, images, oncomplete) {
		var progress = {
			complete: false, template: template,
			loaded: 0, total: images.length, oncomplete: oncomplete || null,
			images: {}
		};
		
		function loaded() {
			progress.loaded++;
			if (progress.loaded >= progress.total) {
				progress.complete = true;
				if (progress.oncomplete instanceof Function) { 
					progress.oncomplete(progress);
				}
			}
		}
		
		for (var i = 0, img, l = images.length; i < l; i++) {
			img = new Image();
			img.onload = loaded;
			progress.images[images[i]] = img;
			img.src = template.replace(findF, images[i]);
		}
		
		return progress;
	}
	
	return loadImage;
})();

if (typeof module !== "undefined") { module.exports = loadImage; }