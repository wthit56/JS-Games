terrain = (function() {
	var cobblestones = function(srcImg) {
		var r = document.createElement("CANVAS");
		r.width = 64; r.height = 27;
		var rctx = r.getContext("2d");
		rctx.drawImage(srcImg, -31, -4);
		r = ctx.createPattern(r, "repeat-x");
		r.pos = { x: 0, y: 64 };
		r.offset = { x: 0, y: 0 };
		
		cobblestones = {
			update: function(timeDiff, time) {
				//r.offset.x = (time * );
			},
			draw: function() {
				ctx.fillStyle = r;
				ctx.translate(r.pos.x, r.pos.y);
				ctx.fillRect(0,0, canvas.width, 27);
			}
		};
	};
	
	var inited = false;
	return {
		init: function(time, csImg) {
			inited = true;
			cobblestones(csImg);
		},
		
		update: function(timeDiff, time) {
		},
		draw: {
			back: function(ctx) {},
			front: function(ctx) {
				cobblestones.draw(ctx);
			}
		}
	};
})();