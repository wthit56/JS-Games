if (!canvas) { alert("Your browser does not support canvas."); }
else {
	canvas.width = 864; canvas.height = 480;
	var ctx = canvas.context;
	
	var zoom = 2;
	var view = { width: canvas.width / zoom, height: canvas.height / zoom };
	var camera = { x: 100, y: 0 };
	var movementSpeed = 100 / 1000;
	
	ctx.scale(zoom, zoom);
	ctx.imageSmoothingEnabled = false;
	//ctx.fillStyle = "red"; ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	var parallax = Loader.base("graphics/$&.png").images("skyline_hills,skyline_trees".split(",")).then(function() {
		var hills = parallax.assets["skyline_hills"] = tintImage(parallax.assets["skyline_hills"], "#1C921C");
		hills.name = "skyline_hills";
		hills.distance = 5;
		hills.top = 0;
		hills.minX = -hills.width + view.width;
		
		var trees = parallax.assets["skyline_trees"] = tintImage(parallax.assets["skyline_trees"], "#234D37");
		trees.name = "skyline_trees";
		trees.distance = 1;
		trees.top = 60;
		trees.minX = -trees.width + view.width;
		
		parallax.draw = function() {
			drawProp(parallax.assets["skyline_hills"]);
			drawProp(parallax.assets["skyline_trees"]);
		};
		function drawProp(prop) {
			var x = camera.x / prop.distance;
			x = x % prop.width;
			if (x > 0) { ctx.drawImage(prop, x - prop.width, prop.top); }
			else if (x < prop.minX) { ctx.drawImage(prop, x + prop.width, prop.top); }
			ctx.drawImage(prop, x, prop.top);
		}
		
		tick();
	});

	var previousFrame = performance.now(), delta;
	var tick = function(time) {
		requestAnimationFrame(tick);
		delta = time - previousFrame;
		update(delta);
		draw(delta);
		previousFrame = time;
	};
	
	var draw = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		parallax.draw();
	};
	var update = function(delta) {
		if (Input.left) {
			camera.x += delta * movementSpeed * (Input.shift ? 10 : 1);
		}
		else if (Input.right) {
			camera.x -= delta * movementSpeed * (Input.shift ? 10 : 1);
		}
		Input.events.length = 0;
	};
}