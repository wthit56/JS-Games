console.log(require("inline-test/markup")(eval("(" + require("inline-test")(function() {

var error = function error(action) { try { action(); } catch(er) { return er; } };

var fbf = require("../fbf.js"), sprite = require("../sprite.js");
fbf instanceof Function; ///

var time;
var f = fbf(10, 4);
f.start instanceof Function; ///

f.start(10); f.index === 0; ///

f.update instanceof Function; ///
f.update(10); f.index === 0; ///
f.update(19); f.index === 0; ///
f.update(20); f.index === 1; ///
f.update(21); f.index === 1; ///
f.update(32); f.index === 2; ///
f.update(45); f.index === 3; ///
f.update(53); f.index === 0; ///
f.update(178); f.index === 0; ///

f.pause instanceof Function; ///
// paused at 231, 1ms into frame 2
f.pause(231);
	f.index === 2; ///
	f.playing === false; ///
// will not change while paused
f.update(240); f.index === 2; ///
f.update(330); f.index === 2; ///
f.unpause instanceof Function; ///
f.unpause(342); f.index === 2; ///
f.update(342); f.index === 2; ///
// The paused time should be cut out, as if it didn't happen.
// As it was unpaused 1ms into frame 2, once it is unpaused
// it will take 9ms to turn to frame 3
f.update(350); f.index === 2; /// only 9ms into frame 2
f.update(351); f.index === 3; /// 10ms into frame 2, new frame

f.pause(371); f.index === 1; ///
f.start(388); f.index === 0; ///

error(function() { f.start(398); }); /// started, then started
f.index === 0; /// index unchanged

error(function() { f.unpause(398); }); /// started, then unpaused
f.index === 0; /// index unchanged

f.pause(398); f.index === 1; ///
error(function() { f.pause(389); }); /// paused, then paused
f.index === 1; /// index unchanged

// TODO: paused, paused

}) + ")()")));