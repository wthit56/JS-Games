cropImage = function(img, src) {
	var canvas = document.createElement("CANVAS");
	canvas.width = src.bottomRight.x - src.topLeft.x;
	canvas.height = src.bottomRight.y - src.topLeft.y;

	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, -src.topLeft.x, -src.topLeft.y);
	ctx = null;
	
	return canvas;
};

if (typeof module !== "undefined") { module.exports = cropImage; }