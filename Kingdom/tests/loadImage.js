console.log(require("inline-test/markup")(eval("(" + require("inline-test")(function() {


var loadImage = require("../loadImage.js");
loadImage instanceof Function; ///

function callback(progress) {
	callback.complete === false; ///
	callback.complete = true;
	progress === p; ///
}
callback.reset = function() {
	callback.complete = false;
	return callback;
}

var t = "graphics/%f.png",
	p = loadImage(t, ["filename", "file2"], callback.reset());

if (p != null) {
	true; /// object returned
	
	p.complete === false; ///
	p.loaded === 0; ///
	p.total === 2; ///
	p.oncomplete === callback; ///
	p.template === t; ///

	if (p.images != null) {
		true; /// p.images exists
	
		if ("filename" in p.images) {
			true; /// exists
			p.images["filename"].src === "graphics/filename.png"; ///
			//console.log(p.images["filename"]);

			p.images["filename"].load();
			callback.complete === false; ///
			p.complete === false; ///
			p.loaded === 1; ///
		}
		if ("file2" in p.images) {
			true; /// exists
			p.images["file2"].src === "graphics/file2.png"; ///

			p.images["file2"].load();
			callback.complete === true; ///
			p.complete === true; ///
			p.loaded === 2; ///
		}
	}
}

}) + ")()")));