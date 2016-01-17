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
	
	var graphics = Loader.base("graphics/$&.png").images("skyline_hills,skyline_trees,cobblestones".split(",")).then(function() {
		var hills = tintImage(graphics.assets["skyline_hills"], "#1C921C");
		hills.name = "skyline_hills";
		hills.distance = 5;
		hills.top = 0;
		hills.minX = -hills.width + view.width;
		
		var trees = tintImage(graphics.assets["skyline_trees"], "#234D37");
		trees.name = "skyline_trees";
		trees.distance = 2;
		trees.top = 60;
		trees.minX = -trees.width + view.width;
		
		var cobblestones = graphics.assets["cobblestones"];
		cobblestones.top = 180;
		cobblestones.distance = 1;
		
		var hills2 = Graphic(tintImage(graphics.assets["skyline_hills"], "#1C921C"), { x: 0, y: 0, camera: camera, width: 100, height: 100 });
		
		graphics.draw = function() {
			//drawProp(hills);
			//drawProp(trees);
			//drawProp(cobblestones);
			hills2.draw(ctx, camera);
		};
		function drawProp(prop) {
			var x = -camera.x / prop.distance;
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