terrain = (function() {
	var cobblestones = function(srcImg) {
		var img = document.createElement("CANVAS");
		img.width = 64; img.height = 27;
		img = img.getContext("2d");
		img.drawImage(srcImg, -31, -4);
		img = ctx.createPattern(img.canvas, "repeat-x");

		var offset = { x: 0, y: 0 },
			rect = {
				pos: { x: 10, y: 62 },
				size: { x: canvas.width - 20, y: 27 }
			};
		
		cobblestones = {
			update: function(time) {
				offset.x = (time * 8 / 1000);
			},
			draw: function() {
				ctx.fillStyle = img;
				ctx.save();
				ctx.translate(rect.pos.x - offset.x, rect.pos.y - offset.y);
				ctx.fillRect(offset.x,offset.y, rect.size.x,rect.size.y);
				ctx.restore();
			}
		};
	};
	
	var inited = false;
	return {
		init: function(time, csImg) {
			inited = true;
			cobblestones(csImg);
		},
		
		update: function(time) {
			cobblestones.update(time);
		},
		draw: {
			back: function(ctx) {},
			front: function(ctx) {
				cobblestones.draw(ctx);
			}
		}
	};
})();