var Input = {
	events: [],
	keyCodes: {
		16: "shift",
		38: "up", 40: "down",
		37: "left", 39: "right"
	},
	touch: {
		x: 0, y: 0, down: false
	}
};

on(window, "keydown", function(e) {
	if (e.keyCode in Input.keyCodes) {
		Input[Input.keyCodes[e.keyCode]] = true;
		Input.shift = e.shiftKey;
	}
	Input.events.push({ time: performance.now(), event: e });
});
on(window, "keyup", function(e) {
	if (e.keyCode in Input.keyCodes) {
		Input[Input.keyCodes[e.keyCode]] = false;
		Input.shift = e.shiftKey;
	}
	Input.events.push({ time: performance.now(), event: e });
});

function pointerDown(e) {
	e.preventDefault();
	Input.touch.down = true;
	if (e.touches) { e = e.touches[0]; }
	Input.touch.x = e.clientX;
	Input.touch.y = e.clientY;
	Input.events.push({ time: performance.now(), event: e });
}
function pointerUp(e) {
	e.preventDefault();
	Input.touch.down = false;
	Input.events.push({ time: performance.now(), event: e });
}
function pointerMove(e) {
	e.preventDefault();
	if (e.touches) { e = e.touches[0]; }
	if (Input.touch.y < 0) { Input.touch.down = false; }
	else {
		Input.touch.x = e.clientX;
		Input.touch.y = e.clientY;
	}
	Input.events.push({ time: performance.now(), event: e });
}

on(window, "touchstart", pointerDown); on(window, "mousedown", pointerDown);
on(window, "touchmove", pointerMove); on(window, "mousemove", pointerMove);
on(window, "touchend", pointerUp); on(window, "touchcancel", pointerUp); on(window, "mouseup", pointerUp);