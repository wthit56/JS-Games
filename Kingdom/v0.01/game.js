function Game(config) {
	var DOM = IO.createCanvas();
	if (!DOM) {
		DOM = this.DOM = document.createElement("DIV");
		DOM.innerText = "Canvas is not support by this browser.";
	}
	else {
		DOM.width = window.innerWidth; DOM.height = window.innerHeight;
		DOM.context.fillRect(0, 0, DOM.width, DOM.height);
		
		var altDOM = IO.createCanvas();
		altDOM.dataset.alt = true;
		altDOM.context.fillStyle = "red";
		
		this.swapDOM = function() {
			DOM.width = DOM.height = 0;
			
			var wh = window.innerHeight, ww = window.innerWidth;
			var width, height;
			
			if (wh > ww) {
				
			}
			
			 16 / 9
			
			
			altDOM.style.width = window.innerWidth + "px"; altDOM.style.height = window.innerHeight + "px";
			
			
			
			this.DOM = altDOM;
			off = DOM; DOM = altDOM; altDOM = off; off = null;
		};
		
		var tick = this.tick = (function() {
			raf(tick);
			
			this.swapDOM();
			
			this.update();
			this.draw();
		}).bind(this);
		
		var y = 0;
		
		this.update = function() {
			var DOM = this.DOM, context = DOM.context;
			
			y++;
		};
		this.draw = function() {
			var DOM = this.DOM, context = DOM.context;
			context.fillStyle = "#AEE4F9";
			context.fillRect(0, 0, DOM.width, DOM.height);
			
			context.strokeStyle = "red";
			context.strokeRect(100.5, y + 0.5, 100, 100);
			
			context.drawImage(assets["skyline_hills"], 0, 0);
			context.drawImage(assets["skyline_trees"], 0, 65);
		};
		
		var loader = Loader.base("graphics/$&.png").images("skyline_hills,skyline_trees".split(",")).then(function() {
			assets["skyline_hills"] = tintImage(assets["skyline_hills"], "#1C921C", altDOM);
			assets["skyline_trees"] = tintImage(assets["skyline_trees"], "#234D37", altDOM);
			altDOM.width = altDOM.height = 0;
			
			raf(tick);
		});
		var assets = loader.assets;
		console.log(window.loader = loader);
	}
}

function tintImage(img, hex, canvas) {
	var ctx = canvas.context;
	canvas.width = img.width; canvas.height = img.height;
	
	ctx.fillStyle = hex;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	ctx.globalCompositeOperation = "destination-in";
	
	ctx.drawImage(img, 0, 0);
	
	var new_img = new Image();
	new_img.src = canvas.toDataURL();
	return new_img;
}