// https://github.com/noio/kingdom/tree/master/assets/gfx
if (!canvas) { alert("Your browser does not support canvas."); }
else {
	canvas.width = 864; canvas.height = 480;
	var ctx = canvas.context;
	
	var zoom = 2;
	var view = { width: canvas.width / zoom, height: canvas.height / zoom };
	var camera = { x: -100, y: 0 };
	var movementSpeed = 100 / 1000;
	
	ctx.scale(zoom, zoom);
	ctx.imageSmoothingEnabled = false;
	//ctx.fillStyle = "red"; ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	var graphics = Loader.base("graphics/$&.png").images("skyline_hills,skyline_trees,cobblestones,water".split(",")).then(function() {
		var hills = Graphic(tintImage(graphics.assets["skyline_hills"], "#1C921C"), { x: 0, y: -50, camera: camera, distance: 5, repeat: "x", canvas: canvas, name: "hills" });
		var trees = Graphic(tintImage(graphics.assets["skyline_trees"], "#234D37"), { x: 0, y: 0, camera: camera, distance: 2, repeat: "x", canvas: canvas, name: "trees" });
		var cobblestones = new Graphic(graphics.assets["cobblestones"], { y: 130, camera: camera, distance: 1, repeat: "x", canvas: canvas });
		var water = new Graphic(graphics.assets["water"], { y: 160, camera: camera, distance: 0.9, repeat: { x: true }, canvas: canvas });
		var water2 = new Graphic(graphics.assets["water"], { y: 190, camera: camera, distance: 0.75, repeat: { x: true }, canvas: canvas });
		
		graphics.draw = function() {
			hills.draw(ctx);
			trees.draw(ctx);
			cobblestones.draw(ctx);
			water.draw(ctx);
			water2.draw(ctx);
		};
		
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
		ctx.fillStyle = "skyblue";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		graphics.draw();
	};
	var update = function(delta) {
		var moveX = false, moveY = false, left = false, up = false, fast = false;
		if (Input.touch.down) {
			moveX = true;
			var x = Input.touch.x;
			if (x < window.innerWidth * 0.5) {
				left = true;
				if (x < window.innerWidth * 0.25) { fast = true; }
			}
			else {
				left = false;
				if (x > window.innerWidth * 0.75) { fast = true; }
			}
		}
		else {
			if (Input.left) {
				moveX = true; left = true;
			}
			else if (Input.right) {
				moveX = true; left = false;
			}
			fast = Input.shift;
		}
		
		if (moveX) {
			camera.x += (left ? -1 : 1) * delta * movementSpeed * (fast ? 10 : 1);
		}
		
		Input.events.length = 0;
	};
}