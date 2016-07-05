console.log(require("inline-test/markup")(eval("(" + require("inline-test")(function() {

var sprite = require("../sprite.js");
sprite instanceof Function; ///

var img = { width: 10, height: 15 };
var frameSize = { x: 5, y: 5 }
var s = sprite(img, frameSize);
s.length === 6; ///

s[0].x === 0 && s[0].y === 0; ///
s[1].x === 5 && s[1].y === 0; ///
s[2].x === 0 && s[2].y === 5; ///
s[3].x === 5 && s[3].y === 5; ///
s[4].x === 0 && s[4].y === 10; ///
s[5].x === 5 && s[5].y === 10; ///

}) + ")()")));