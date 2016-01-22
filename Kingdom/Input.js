var input = (function() {
	var input = [];
	function log(e) {
		e = e || window.event;
		e.time = performance.now();
		input.push(e);
	}
	"keydown,keyup".split(",").forEach(function(event) {
		on(window, event, log);
	});
	return input;
})();