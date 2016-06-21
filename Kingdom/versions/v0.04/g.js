var g = (function() {
	var v0 = [0, 0];
	
	var r, ip, is, op, os;
	return function g_draw(context) {
		var ss = this.src.size;
		if (!ss) {
			this.src.size = ss = [this.src.width, this.src.height];
		}
		
		// in: { position: [10, 12], size: [64, 64] }, out: { position: [100, 5], size: [100, 60] }
		if (this.in) {
			ip = this.in.position || v0;
			r = this.in.size; is = (!r || (r[0] === this.src.width && r[1] === this.src.height)) ? ss : r;
		}
		else {
			ip = v0; is = ss;
		}
		
		if (this.out) {
			r = this.out.position; op = (!r || (r[0] === 0 && r[1] === 0)) ? v0 : r;
			r = this.out.size; os = (!r ||
				(r[0] === is[0] && r[1] === is[1])
			) ? is : r;
		}
		else {
			op = v0; os = is;
		}
		
		console.log(ip, is, op, os, ss);
		
		r = null;
		
		if (ip !== v0 || is !== ss) {
			console.log("slice", os, ss, is);
			//      drawImage(image,    sx,    sy,    sWidth, sHeight, dx,    dy,   dWidth, dHeight)
			context.drawImage(this.src, ip[0], ip[1], is[0],  is[1],   op[0], op[1], os[0], os[1]  );
		}
		else if (os !== is) {
			console.log("scale");
			//      drawImage(image,    x,     y,     width, height)
			context.drawImage(this.src, op[0], op[1], os[0], os[1]);
		}
		else {
			console.log("stamp");
			//      drawImage(image,    x,     y    )
			context.drawImage(this.src, op[0], op[1]);
		}
	};
})();

if (typeof module !== "undefined") { module.exports = g; }