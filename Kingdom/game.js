var canvas = document.createElement("CANVAS"), ctx;
if (!canvas.getContext || !(ctx = canvas.getContext("2d"))) {
	alert("This browser does not support canvas.");
}
else {
	canvas.width = 864 / 2; canvas.height = 480 / 2;
	document.body.appendChild(canvas);
	
	var hills, trees, cobblestones;
	var graphics = load("graphics/$&.png", "skyline_hills", "skyline_trees", "cobblestones").then(function() {
		hills = tint(graphics["skyline_hills"], "#1C921C");
		hills.position = { x: 0, y: -20, z: 5 };
		
		trees = tint(graphics["skyline_trees"], "#234D37");
		trees.position = { x: 0, y: 40, z: 2 };
		
		cobblestones = graphics["cobblestones"];
		cobblestones.position = { x: 0, y: 170, z: 1 };
		
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