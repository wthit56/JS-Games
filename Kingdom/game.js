if (!canvas) { alert("Your browser does not support canvas."); }
else {
	canvas.width = 864; canvas.height = 480;
	
	
	var ctx = canvas.context;
	ctx.imageSmoothingEnabled = false;
	//ctx.fillStyle = "red"; ctx.fillRect(0, 0, canvas.width, canvas.height);

	var zoom = 2;
	ctx.scale(zoom, zoom);

	var camera = { x: 0, y: 0 };
	var movementSpeed = 100 / 1000;
	
	var parallax = Loader.base("graphics/$&.png").images("skyline_hills,skyline_trees".split(",")).then(function() {
		var hills = parallax.assets["skyline_hills"] = tintImage(parallax.assets["skyline_hills"], "#1C921C");
		hills.distance = 5;
		hills.top = 0;
		
		var trees = parallax.assets["skyline_trees"] = tintImage(parallax.assets["skyline_trees"], "#234D37");
		trees.distance = 1;
		trees.top = 60;
		
		parallax.draw = function() {
			drawProp(parallax.assets["skyline_hills"]);
			drawProp(parallax.assets["skyline_trees"]);
		};
		function drawProp(prop) {
			ctx.drawImage(prop, camera.x / prop.distance, prop.top);
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
			camera.x += delta * movementSpeed;
		}
		else if (Input.right) {
			camera.x -= delta * movementSpeed;
		}
	};
}