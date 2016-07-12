terrain = (function() {
	var result = {
		init: function(time, csImg) {
			cobblestones(csImg);
			this.init = null;
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
	
	var cobblestones = function(srcImg) {
		var img = ctx.createPattern(
			cropImage(srcImg, { topLeft: { x: 31, y: 4 }, bottomRight: { x: 95, y: 31 } }),
			"repeat-x"
		);

		var offset = { x: 0, y: 0 },
			rect = {
				pos: { x: 10, y: 62 },
				size: { x: canvas.width - 20, y: 27 }
			};
		
		var oldTime = performance.now();
		cobblestones = {
			update: function(time) {
				if (king.walking) {
					offset.x += ((time - oldTime) * 8 / 1000);
					// console.log(offset.x);
				}
				oldTime = time;
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
	
	return result;
})();