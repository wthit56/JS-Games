function Graphic(src, config) {
	if (!(this instanceof Graphic)) { return new Graphic(src, config); }
	for (var key in config) { this[key] = config[key]; }
	this.src = src;
}
Graphic.prototype = {
	draw: (function() {
		var x, y;
		var fx, fy, fw, fh,
			tw, th, to;
		return function Graphic__draw(ctx) {
			x = this.x || 0; y = this.y || 0;
			if (this.camera) { x -= this.camera.x; y -= this.camera.y; }
			if (("distance" in this) && (this.distance !== 1)) {
				x /= this.distance; y /= this.distance;
			}
			
			to = (("width" in this) || ("height" in this));
			if (this.from || to) {
				if (this.from) {
					fx = this.from.x; fy = this.from.y; fw = this.from.width; fh = this.from.height;
					if (isNaN(fx + fy + fw + fh)) { throw new Error("Graphic: instance.from must be fully defined."); }
					else if (fx < 0 || fy < 0 || fx + fw > this.src.width || fy + fh > this.src.height) { throw new Error("Graphic: instance.from area must be within the instance.src image."); }
				}
				else {
					fx = 0; fy = 0; fw = this.src.width; fh = this.src.height;
				}

				tw = ("width" in this) ? this.width : fw;
				th = ("height" in this) ? this.height : fh;
			}
			
			if (this.from) {
				ctx.drawImage(this.src, fx, fy, fw, fh, x, y, tw, th);
			}
			else if (to) {
				ctx.drawImage(this.src, x, y, tw, th);
			}
			else {
				ctx.drawImage(this.src, x, y);
			}
		};
	})()
};

if (typeof module !== "undefined") {
	module.exports = Graphic;
}