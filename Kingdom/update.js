var update = (function() {
	var buttons = {
		byKeyCode: {
			40: "down", 28: "up", 37: "left", 39: "right",
			16: "shift"
		}
	};
	
	var simTime = 0, simDelta, cameraSpeed;
	function sim(time) {
		simDelta = time - simTime;
		
		cameraSpeed = (buttons.shift ? camera.zip : camera.speed);
		
		var move = false;
		if (buttons.left) {
			if (!buttons.right) {
				king.graphic.flip = true;
				king.x -= simDelta * cameraSpeed;
				move = true;
			}
		}
		else if (buttons.right) {
			king.graphic.flip = false;
			king.x += simDelta * cameraSpeed;
			move = true;
		}
		
		if (move) {
			if (king.graphic.current !== king.graphic.walk) {
				console.log("set to walk");
				king.graphic.loopFrom = time;
				king.graphic.current = king.graphic.walk;
			}
		}
		else {
			king.graphic.current = king.graphic.idle;
		}
		
		simTime = time;
	}
	
	var updateTime = 0, updateDelta;
	return function(time) {
		while (input.length > 0) {
			var e = input.shift();
			if (e.type.indexOf("key") === 0) { 
				buttons[buttons.byKeyCode[e.keyCode]] = e.type === "keydown";
				buttons.shift = e.shiftKey;
			}
			sim(e.time);
		}
		sim(time);
		
		camera.x = king.x - king.cameraOffset.x;
		camera.y = king.y - king.cameraOffset.y;
		
		updateDelta = time - updateTime;
		if (king.graphic.current.length > 1) {
			var index = ((time - king.graphic.loopFrom) / king.graphic.frame.duration) % king.graphic.current.length;
			
			king.graphic.frame.index = king.graphic.current[index | 0];
		}
		else {
			king.graphic.frame.index = king.graphic.current[0];
		}
		//console.log(king.graphic.frame.index);
		
		updateTime = time;
	};
})();