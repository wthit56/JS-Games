var Input = {
	keyCodes: {
		38: "up", 40: "down",
		37: "left", 39: "right"
	}
};

on(window, "keydown", function(e) {
	if (e.keyCode in Input.keyCodes) {
		Input[Input.keyCodes[e.keyCode]] = true;
	}
});
on(window, "keyup", function(e) {
	if (e.keyCode in Input.keyCodes) {
		Input[Input.keyCodes[e.keyCode]] = false;
	}
});