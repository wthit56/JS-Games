var parallax = (function() {
	var result = { x: 0, y: 0 };
	var parallax = function(position) {
		result.x = (position.x - (parallax.camera.x / position.z)) | 0;
		result.y = (position.y - (parallax.camera.y / position.z)) | 0;
		return result;
	};
	parallax.draw = function(obj) {
		var pos = parallax(obj.position);
		ctx.drawImage(obj, pos.x | 0, pos.y | 0);
	};
	parallax.draw.repeatX = function(obj) {
		var pos = parallax(obj.position);
		pos.x %= obj.width;
		if ((pos.x < canvas.width) && (pos.x + obj.width > 0)) {
			ctx.drawImage(obj, pos.x, pos.y);
		}
		if (pos.x > 0) {
			while (pos.x > 0) {
				pos.x -= obj.width;
				ctx.drawImage(obj, pos.x, pos.y);
			}
		}
		if (pos.x + obj.width < canvas.width) {
			while (pos.x + obj.width < canvas.width) {
				pos.x += obj.width;
				ctx.drawImage(obj, pos.x, pos.y);
			}
		}
	};
	parallax.camera = { x: 0, y: 0 };
	
	return parallax;
})();