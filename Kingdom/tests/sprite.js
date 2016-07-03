console.log(require("inline-test/markup")(eval("(" + require("inline-test")(function() {

var sprite = require("../sprite.js");
sprite instanceof Function; ///

var img = { width: 10, height: 15 };
var frameSize = { x: 5, y: 5 }
var s = sprite(img, frameSize);
s.length === 6; ///

var p = s.map(function(src) { return src.pos; });
p[0].x === 0 && p[0].y === 0; ///
p[1].x === 5 && p[1].y === 0; ///
p[2].x === 0 && p[2].y === 5; ///
p[3].x === 5 && p[3].y === 5; ///
p[4].x === 0 && p[4].y === 10; ///
p[5].x === 5 && p[5].y === 10; ///

s.every(function(src) { return src.size.x === frameSize.x && src.size.y === frameSize.y; }); ///

}) + ")()")));