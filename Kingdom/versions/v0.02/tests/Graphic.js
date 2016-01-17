console.log(require("inline-test/markup")(eval("(" + require("inline-test")(function() {
var testDraw = require("./Graphic.testDraw.js");
var deadContext = { drawImage: function() {} };
function errorCheck(action) {
	var error;
	try { action(); } catch(_error) { error = _error; }
	return error;
}

// basics
var g = require("../Graphic.js");
g instanceof Function; ///
new g() instanceof g; ///
g() instanceof g; ///

//       config  expected calls...
//        v       v
testDraw(null,   [0, 0]); ///

// POSITION
testDraw({ x: 1, y: -2 }, [1, -2]); /// 

// CAMERA
var camera = { x: 10, y: -2.3 };
testDraw({ x: 1, y: -2, camera: camera }, [-9, 0.3]); /// 

camera.x = 100; camera.y = -15; // camera moved
testDraw(testDraw.instance, [-99, 13]); ///

testDraw.instance.distance = 5; // camera distance added
testDraw(testDraw.instance, [-19.8, 2.6]); /// 

// TO (destination)
testDraw({ src: { width: 20, height: 20 }, x: 1, y: 2 }, [1, 2]); /// none set
testDraw({ src: { width: 1, height: 10 }, x: 1, y: 2, width: 100 }, [1, 2, 100, 10]); /// width set
testDraw({ src: { width: 100, height: 1 }, x: 1, y: 2, height: 10 }, [1, 2, 100, 10]); /// height set
testDraw({ src: { width: 20, height: 20 }, x: 1, y: 2, width: 30, height: 30 }, [1, 2, 30, 30]); /// width and height set

// FROM (source)
testDraw({ src: { width: 10, height: 11 }, x: 1, y: 2, from: { x: 3, y: 4, width: 5, height: 6 } }, [3, 4, 5, 6, 1, 2, 5, 6]); /// destination size inherited from source size
errorCheck(function() { g({ width: 10, height: 11 }, { x: 1, y: 2, from: { x: -3, y: 4, width: 5, height: 6 } }).draw(deadContext) }); /// invalid `.from` position; error should be thrown
errorCheck(function() { g({ width: 10, height: 11 }, { x: 1, y: 2, from: { x: 3, y: 4, width: 8, height: 6 } }).draw(deadContext) }); /// invalid `.from` area; error should be thrown

}) + ")()")).replace(/\t/g, "    "));





