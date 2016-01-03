var g = require("../Graphic.js");
module.exports = function testDraw(config) {
	var img, i;
	if (config instanceof g) {
		img = config.src;
		i = testDraw.instance = config;
	}
	else {
		img = (config && config.src) || {};
		i = testDraw.instance = g(img, config);
	}
	
	var results = testDraw.results = [], expected = Array.prototype.slice.call(arguments, 1);
	i.draw({ drawImage: function() {
		results.push(Array.prototype.slice.call(arguments));
	} });
	
	results.sort(sortDraws); expected.sort(sortDraws);
	if (results.every(function(draw, i) {
		return (
			(draw.length - 1 === expected[i].length) &&
			draw.every(function(value, j) {
				return j === 0 ? value === img : near(value, expected[i][j - 1]);
			})
		);
	})) { return true; }
	else {
		console.log(results);
		return false;
	}
}
function sortDraws(a, b) {
	return (a.length - b.length || a[1] - b[1] || a[2] - b[2] || a[3] - b[3] || a[4] - b[4] || a[5] - b[5] || a[6] - b[6] || a[7] - b[7] || a[8] - b[8] || a[9] - b[9] || 0);
}
function near(a, b) {
	return a === b || (a - b > -1e-15 && a - b < 1e-15);
}