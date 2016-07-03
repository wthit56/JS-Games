fbf = (function() {
	function fbf(fDur, fCount) {
		return { duration: fDur, count: fCount,
			started: 0, index: 0, paused: 0, playing: false,
			start: fbfStart, update: fbfUpdate, pause: fbfPause, unpause: fbfUnpause };
	}
	
	function fbfStart(time) {
		if (this.playing) { throw "FBF: Cannot start while playing."; }
		else {
			this.started = time;
			this.playing = true;
			this.index = 0;
		}
	}
	function fbfUpdate(time) {
		if (this.playing) {
			this.index = (((time - this.started) / this.duration) % this.count) | 0;
		}
	}
	function fbfPause(time) {
		if (!this.playing) { throw "FBF: Cannot pause while not playing."; }
		this.update(time);
		this.playing = false;
		this.paused = time;
	}
	function fbfUnpause(time) {
		if (this.playing) { throw "FBF: Cannot unpause while playing."; }
		this.playing = true;
		this.started += (time - this.paused);
	}
	
	return fbf;
})();

if (typeof module !== "undefined") { module.exports = fbf; }