function tint(img, colour) {
	var w = img.width, h = img.height;
	
	var canvas = document.createElement("CANVAS"), ctx = canvas.getContext("2d");
	canvas.width = w; canvas.height = h;
	
	ctx.drawImage(img, 0, 0);
	ctx.globalCompositeOperation = "source-in";
	ctx.fillStyle = colour;
	ctx.fillRect(0, 0, w, h);
	
	return canvas;
}