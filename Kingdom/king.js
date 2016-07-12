king = (function() {
	var inited = false;
	var sheet, fps = 10,
		anim = {
			current: null,
			walk: { frames: [0,1,2,3,4,5,6,7], fbf: fbf(fps, 8) },
			stand: { frames: [8], fbf: fbf.single },
			graze: { frames: [9,10], fbf: fbf(4, 2) },
			
			start: function(time, name) {
				(this.current = this[name]).fbf.start(time);
			},
			update: function(time) {
				this.current.fbf.update(time);
				// console.log(time, this.current.fbf.index, this.current.fbf.t ? this.current.fbf.t.time : "");
			},
			index: function() { return this.current.frames[this.current.fbf.index]; }
		};
		
	var cycle = ["walk", "stand", "graze"]; cycle.current = 0; cycle.changed = false;
	var result = {
		init: function(time, srcImage) {
			var img = king.image = { img: srcImage, draw: drawImage,
				dest: { pos: { x: 0, y: 0 } }
			};
			img.src = { pos: { x: 0, y: 0 }, size: { x: 64, y: 64 } };
			sheet = sprite(img.img, img.src.size);
			
			anim.start(time, "walk");
			setInterval(function() {
				cycle.current = (cycle.current + 1) % cycle.length;
				result.walking = (cycle[cycle.current] === "walk");
				cycle.changed = true;
			}, 1000);
			
			inited = true;
		},

		walking: true,
		update: function(time) {
			if (!inited) { return; }
			
			if (cycle.changed) {
				anim.start(time, cycle[cycle.current]);
				cycle.changed = false;
			}
			anim.update(time);
			this.image.src.pos = sheet[anim.index()];
		},
		draw: function(ctx) {
			if (!inited) { return; }
			this.image.draw(ctx);
		}
	};
	return result;
})();