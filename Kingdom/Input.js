var Input = {
	events: [],
	keyCodes: {
		16: "shift",
		38: "up", 40: "down",
		37: "left", 39: "right"
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