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
			x = this.x; y = this.y;
			if (this.camera) { x -= this.camera.x; y -= this.camera.y; }
			if (("distance" in this) && (this.distance !== 1)) {
				x /= this.distance; y /= this.distance;
			}
			
			to = ("width" in this) || ("height" in this);
			if (this.from || to) {
				if (this.from) {
					fx = this.from.x; fy = this.from.y; fw = this.from.width; fh = this.from.height;
				}
				else {
					fw = this.src.width; fh = this.src.height;
				}
				
				tw = ("width" in this) ? this.width : fw;
				th = ("height" in this) ? this.height : fh;
				
				if (this.from) {
					ctx.drawImage(this.src, fx, fy, fw, fh, x, y, tw, th);
				}
				else {
					ctx.drawImage(this.src, x, y, tw, th);
				}
			}
			else {
				ctx.drawImage(this.src, x, y);
			}
		};
	})()
};
