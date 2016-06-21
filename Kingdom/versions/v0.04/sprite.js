var sprite = (function() {
	var sprite = {};
	var i, x, ox, oy;
	sprite.draw = function(graphic, position) {
		var pos = parallax(position);
		
		i = graphic.frame.index | 0;
		x = i * graphic.frame.width;
		ox = x % graphic.width;
		oy = x > graphic.width ? ((x - ox) / graphic.width) * graphic.frame.height : 0;
		
		ctx.save();
		ctx.translate(pos.x, pos.y);
		if (graphic.flip) { ctx.scale(-1, 1); }
		ctx.drawImage(graphic,
			ox, oy, graphic.frame.width, graphic.frame.height,
			-graphic.offset.x / 2, -graphic.offset.y, graphic.frame.width, graphic.frame.height);
		ctx.restore();
	};
	
	return sprite;
})();