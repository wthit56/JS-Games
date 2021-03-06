time = function(from) {
	var time = 0, // simtime
		lastrealtime = 0, // last known real time
							// used to detect invalid realtimes
		offsetR = 0, // realtime speed changed at 
		offsetT = 0, // simtime speed changed at
		offsetS = 0, // simtime starts from this realtime
		speed = 1; // simtime speed
	
	var result = {
		update: function(realtime) {
			if (realtime < offsetR) { throw new Error("Realtime cannot move backwards (" + realtime + " from " + offsetR + ")."); }
			else {
				lastrealtime = realtime;
				
				if (speed !== 0) {
					// var oldtime = time;
					time = (offsetT + ((realtime - offsetR) * speed)) - offsetS;
					// console.log(realtime,":", { oldTime: oldtime, offsetR: offsetR, offsetT: offsetT, offsetS: offsetS, speed: speed }, "=", time);
				}
			}
		},
		setSpeed: function(realtime, _speed) {
			if (realtime !== lastrealtime) { result.update(realtime); }
			offsetR = realtime;
			offsetT = time;
			speed = _speed;
		},
		resetTime: function(realtime) {
			if (realtime !== lastrealtime) { result.update(realtime); }
			time = 0;
			offsetR = realtime;
			offsetT = time;
			offsetS = time;
		}
	};
	
	Object.defineProperties(result, {
		time: { get: function() { return time; } },
		speed: { get: function() { return speed; } }
	});
	
	return result;
};

if (typeof module !== "undefined") { module.exports = time; }