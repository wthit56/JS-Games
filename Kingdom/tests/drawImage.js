console.log(require("inline-test/markup")(eval("(" + require("inline-test")(function() {

var drawImage = require("../drawImage.js");
drawImage instanceof Function; ///

var ctx = require("./drawImage-ctx.js");
function test(config, expected, withCtx) {
	ctx.passed = false; ctx.called = false; ctx.actual = null;
	ctx.expected = expected;
	drawImage.call(config, withCtx === false ? undefined : ctx);
	if (!ctx.passed) {
		console.log("failed test: " + (ctx.actual ? JSON.stringify(Array.prototype.slice.call(ctx.actual)) : "!"));
		return false;
	}
	return true;
}



var img = { width: 9, height: 10 };
ctx.called = false; drawImage.call(null); !ctx.called; /// no config
ctx.called = false; drawImage.call({}); !ctx.called; /// no img in config

test({ img: img,
	src: { pos: { x: 1, y: 2 }, size: { x: 3, y: 4 } },
	dest: { pos: { x: 5, y: 6 }, size: { x: 7, y: 8 } }
}, [img, 1, 2, 3, 4, 5, 6, 7, 8]); /// all values

//# a single src value
test({ img: img,
	src: { pos: { x: 1, y: 0 } }
}, [img, 1, 0, img.width, img.height, 0, 0, img.width, img.height]); /// x
test({ img: img,
	src: { pos: { x: 0, y: 1 } }
}, [img, 0, 1, img.width, img.height, 0, 0, img.width, img.height]); /// y
test({ img: img,
	src: { size: { x: 1, y: img.height } }
}, [img, 0, 0, 1, img.height, 0, 0, img.width, img.height]); /// width
test({ img: img,
	src: { size: { x: img.width, y: 1 } }
}, [img, 0, 0, img.width, 1, 0, 0, img.width, img.height]); /// height

//*----- dest size values only -----
test({ img: img,
	dest: { size: { x: 1, y: 2 } }
}, [img, 0, 0, 1, 2]); /// no src values
test({ img: img,
	src: { pos: { x: 0, y: 0 } },
	dest: { size: { x: 1, y: img.height } }
}, [img, 0, 0, 1, img.height]); /// default src, width
test({ img: img,
	src: { size: { x: img.width, y: img.height } },
	dest: { size: { x: img.width, y: 1 } }
}, [img, 0, 0, img.width, 1]); /// default src, height
//*/

//*----- default src values, no dest size values -----
test({ img: img,
	dest: { pos: { x: 1, y: 2 } }
}, [img, 1, 2]); /// no src
test({ img: img,
	src: { pos: { x: 0, y: 0 } },
	dest: { pos: { x: 0, y: 1 } }
}, [img, 0, 1]); /// default src pos, dest x
test({ img: img,
	src: { size: { x: img.width, y: img.height } },
	dest: { pos: { x: 1, y: 0 } }
}, [img, 1, 0]); /// default src size, dest y
	
//*/

/*
void ctx.drawImage(image, dx, dy);
void ctx.drawImage(image, dx, dy, dWidth, dHeight);
void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
*/

}) + ")()")));









