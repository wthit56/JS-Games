function Graphic(src, config) {
	if (!(this instanceof Graphic)) { return new Graphic(src, config); }
	for (var key in config) { this[key] = config[key]; }
	if (!("x" in this)) { this.x = 0; }
	if (!("y" in this)) { this.y = 0; }
	if (!("distance" in this)) { this.distance = 1; }
	this.camera = Object.create(this.camera);
	this.src = src;
}
Graphic.prototype = {
	draw: function(ctx) {
		var x = this.x - (this.camera.x / this.distance);
		var y = this.y - (this.camera.y / this.distance);
		if (this.repeat) {
			x %= this.src.width;
		}

		ctx.drawImage(this.src, x, y);
		
		if (this.repeat) {
			var ix, step = this.src.width, r;
			if (x > 0) {
				ix = x;
				while (ix > 0) {
					ix -= step;
					ctx.drawImage(this.src, ix, y);
				}
			}
			if (x < (r = this.canvas.width - this.src.width)) {
				ix = x;
				while (ix < r) {
					ix += step;
					ctx.drawImage(this.src, ix, y);
				}
			}
		}
	}
};

if (typeof module !== "undefined") {
	module.exports = Graphic;
}