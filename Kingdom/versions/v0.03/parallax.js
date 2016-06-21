var parallax = (function() {
	var result = { x: 0, y: 0 }, z;
	var nullOffset = { x: 0, y: 0 };
	var parallax = function(position) {
		var offset = position.offset || nullOffset;
		z = ("z" in position ? position.z : 1);
		result.x = (position.x + offset.x - (parallax.camera.x / z)) | 0;
		result.y = (position.y + offset.y - (parallax.camera.y / z)) | 0;
		return result;
	};
	parallax.draw = function(graphic, position) {
		var pos = parallax(graphic.position || position);
		ctx.drawImage(graphic, pos.x | 0, pos.y | 0);
	};
	parallax.draw.repeatX = function(graphic, position) {
		var pos = parallax(graphic.position || position);
		pos.x %= graphic.width;
		if ((pos.x < canvas.width) && (pos.x + graphic.width > 0)) {
			ctx.drawImage(graphic, pos.x, pos.y);
		}
		if (pos.x > 0) {
			while (pos.x > 0) {
				pos.x -= graphic.width;
				ctx.drawImage(graphic, pos.x, pos.y);
			}
		}
		if (pos.x + graphic.width < canvas.width) {
			while (pos.x + graphic.width < canvas.width) {
				pos.x += graphic.width;
				ctx.drawImage(graphic, pos.x, pos.y);
			}
		}
	};
	parallax.camera = { x: 0, y: 0 };
	
	return parallax;
})();