if (typeof time === "undefined") { time = require("./time.js"); }
 
fbf = (function() {
	function fbf(fps, fCount, realtime) {
		realtime = realtime || 0;
		var speed = fps / 1000;
		
		var t = time(realtime);
		t.setSpeed(realtime, speed);
		t.resetTime(realtime);
		
		var index = 0;
		function updateIndex() {
			index = (t.time % fCount) | 0;
		}
		
		var playing = false;
		return Object.create(null, {
			t: { value: t },
			
			index: { get: function() { return index; } },
			playing: { get: function() { return playing; } },
			
			update: { value: function(time) {
				t.update(time);
				updateIndex();
			} },
			
			start: { value: function(time) {
				t.resetTime(time);
				this.unpause(time);
			} },
			pause: { value: function(time) {
				t.setSpeed(time, 0);
				playing = false;
				updateIndex();
			} },
			unpause: { value: function(time) {
				t.setSpeed(time, speed);
				playing = true;
				updateIndex();
			} }
		});
	}

	var emptyFunc = function() {};
	fbf.single = {
		index: 0,
		playing: true,
		update: emptyFunc, start: emptyFunc, pause: emptyFunc, unpause: emptyFunc
	};

	return fbf;
})();

if (typeof module !== "undefined") { module.exports = fbf; }