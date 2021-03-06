function sprite(image, frameSize) {
	var result = [],
		ix = image.width, iy = image.height,
		fx = frameSize.x, fy = frameSize.y;
	
	for (var x, y = 0; y + fy <= iy; y += fy) {
		for (x = 0; x + fx <= ix; x += fx) {
			result.push({ x: x, y: y });
		}
	}
	
	return result;
}

if (typeof module !== "undefined") { module.exports = sprite; }