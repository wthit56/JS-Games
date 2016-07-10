console.log(require("inline-test/markup")(eval("(" + require("inline-test")(function() {

function error(action) { try { action(); } catch(e) { return e; } }

var time = require("../time.js");
(time instanceof Object) && (time != null); ///

var t = time();

t.time = 3; t.time === 0; ///
t.speed = 10; t.speed === 1; ///

// .update(realtime) - updates simtime
error(function() { t.update(-1); }); /// backwards realtime
t.update(1); t.time === 1; ///
t.update(5); t.time === 5; ///

// .setSpeed(realtime, newSpeed) - how fast simtime changes relative to realtime
error(function() { t.setSpeed(4, 1); }); /// backwards realtime
t.setSpeed(6, 2);
	t.time === 6; ///
	t.speed === 2; ///
// current time is 6
t.update(10); t.time === 14; /// old time + (change in realtime * speed)

t.setSpeed(15, 0);
	t.time === 24; ///
	t.speed === 0; ///

t.update(16); t.time === 24; ///

t.setSpeed(16, -1.5);
	t.time === 24; ///
	t.speed === -1.5; ///

t.update(300); t.time === -402; ///
t.update(302); t.time === -405; ///

t.setSpeed(305, 1);
	t.time === -409.5; ///
	t.speed === 1; ///
error(function() { t.update(302); }); /// backwards realtime
t.update(307); t.time === -407.5; ///

// .resetTime(realtime) -- zeroes simtime from realtime onward
error(function() { t.resetTime(300); }); ///
t.resetTime(310); t.time === 0; ///
t.update(351); t.time === 41; ///

t.setSpeed(352, 2); t.time === 42; ///
t.update(400); t.time === 138; ///

t.setSpeed(401, 0); t.time === 140; ///
t.update(410); t.time === 140; ///
t.update(411); t.time === 140; ///

t.setSpeed(415, -0.1); t.time === 140; ///
t.update(420); t.time === 139.5; ///

}) + ")()")));