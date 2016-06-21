var canvas = document.createElement("CANVAS"), ctx;
if (!canvas.getContext || !(ctx = canvas.getContext("2d"))) {
	alert("This browser does not support canvas.");
}
else {
	canvas.width = 864 / 3; canvas.height = 480 / 3;
	document.body.appendChild(canvas);
	
	var king = {
		cameraOffset: { x: canvas.width / 2, y: canvas.height / 2 },
		x: canvas.width / 2, y: 100
	};
	
	var hills, trees, cobblestones;
	var graphics = load("graphics/$&.png", "skyline_hills", "skyline_trees", "cobblestones", "king").then(function() {
		hills = tint(graphics["skyline_hills"], "#1C921C");
		hills.position = { x: 0, y: -60, z: 5 };
		
		trees = tint(graphics["skyline_trees"], "#234D37");
		trees.position = { x: 0, y: -10, z: 2 };
		
		cobblestones = graphics["cobblestones"];
		cobblestones.position = { x: 0, y: 110, z: 2 };
		
		var k = king.graphic = graphics["king"];
		k.frame = { index: 0, width: 64, height: 100, duration: 1000 / 5 };
		k.offset = { x: 60, y: 40 };
		k.frames = 11;
		k.idle = [8]; k.eat = [10, 11, 12];
		k.walk = [0, 1, 2, 3, 4, 5, 6, 7];
		k.current = k.idle;
		
		frame();
	}).assets;
	
	var camera = { x: 0, y: 0, speed: 100 / 1000, zip: 300 / 1000 };
	parallax.camera = camera;
	
	var frame = function(time) {
		draw(time);
		update(time);
		raf(frame);
	};
	
	viewport(canvas);
}