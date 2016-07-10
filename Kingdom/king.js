king = (function() {
	var inited = false;
	var sheet, walk;
	var x, startTime;
	return {
		init: function(time, srcImage) {
			var img = king.image = { img: srcImage, draw: drawImage,
				dest: { pos: { x: 0, y: 0 } }
			};
			img.src = { pos: { x: 0, y: 0 }, size: { x: 64, y: 64 } };
			sheet = sprite(img.img, img.src.size);
			walk = fbf(1000 / 10, 8);
			
			walk.start(time);
			startTime = time;
			inited = true;
		},

		update: function(time) {
			if (!inited) { return; }
			//this.image.dest.pos.x = -64 + (((time - startTime) * (35 / 1000)) % (canvas.width + 64));
			// console.log(time);
			walk.update(time);
			this.image.src.pos = sheet[walk.index];
		},
		draw: function(ctx) {
			if (!inited) { return; }
			this.image.draw(ctx);
		}
	};
})();