function tintImage(img, hex) {
	var canvas = document.createElement("CANVAS");
	var ctx = canvas.getContext("2d");
	canvas.width = img.width; canvas.height = img.height;
	
	ctx.fillStyle = hex;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	ctx.globalCompositeOperation = "destination-in";
	
	ctx.drawImage(img, 0, 0);
	
	return canvas;
}