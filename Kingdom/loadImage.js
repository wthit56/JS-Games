if (typeof Image === "undefined") { Image = require("./tests/Image.js"); }

loadImage = (function() {
	var filename = /%f/;
	
	return function loadImage(template, files, oncomplete) {
		var progress = { complete: false, loaded: 0, total: files.length, template: template, images: {}, oncomplete: oncomplete };
		
		function imgOnload() {
			this.onload = null;
			if (++progress.loaded >= progress.total) {
				progress.complete = true;
				if (progress.oncomplete instanceof Function) {
					progress.oncomplete.call(this, progress);
				}
			}
		}
		
		for (var i = 0, img, l = files.length; i < l; i++) {
			img = new Image();
			progress.images[files[i]] = img;
			img.onload = imgOnload;
			img.src = template.replace(filename, files[i]);
		}
		
		return progress;
	};
})();

if (typeof module !== "undefined") { module.exports = loadImage; }