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
		
		if (buttons.left) {
			if (!buttons.right) {
				camera.x -= simDelta * cameraSpeed;
			}
		}
		else if (buttons.right) {
			camera.x += simDelta * cameraSpeed;
		}
		simTime = time;
	}
	
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
	};
})();