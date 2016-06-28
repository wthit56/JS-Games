drawImage = (function() {
	var spx, spy, ssx, ssy,
		dpx, dpy, ds, dsx, dsy;
	
	spx = spy = ssx = ssy = dpx = dpy = dsx = dsy = 0;

	function drawImage(ctx) {
		if (!this.img) { return; }
		else if (!ctx) {
			if (!this.ctx) { return; }
			else { ctx = this.ctx; }
		}
		else {
			spx = spy = 0; ssx = this.img.width; ssy = this.img.height;
			dpx = dpy = 0; ds = false; dsx = this.img.width; dsy = this.img.height;
			if (this.src) {
				if (this.src.pos) {
					spx = this.src.pos.x;
					spy = this.src.pos.y;
				}
				if (this.src.size) {
					ssx = this.src.size.x;
					ssy = this.src.size.y;
				}
			}
			if (this.dest) {
				if (this.dest.pos) {
					dpx = this.dest.pos.x;
					dpy = this.dest.pos.y;
				}
				if (this.dest.size) {
					ds = true;
					dsx = this.dest.size.x;
					dsy = this.dest.size.y;
				}
			}
			
			/*
			void ctx.drawImage(image, dx, dy); no src, no dest size
			void ctx.drawImage(image, dx, dy, dWidth, dHeight); no src, dest size
			void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight); src
			*/
			
			if (spx !== 0 || spy !== 0 || ssx !== this.img.width || ssy !== this.img.height) {
				ctx.drawImage(this.img, spx, spy, ssx, ssy, dpx, dpy, ds ? dsx : ssx, ds ? dsy : ssy);
			}
			else if /* no src && */ (dsx !== this.img.width || dsy !== this.img.height) {
				ctx.drawImage(this.img, dpx, dpy, dsx, dsy);
			}
			else /* no src && no dest size */ {
				ctx.drawImage(this.img, dpx, dpy);
			}
		}
	}
	
	return drawImage;
})();

if (typeof module !== "undefined") { module.exports = drawImage; }