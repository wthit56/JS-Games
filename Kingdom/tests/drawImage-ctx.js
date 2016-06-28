var ctx = { drawImage: function() {
	this.called = true; this.actual = arguments;
	if (this.expected && (arguments.length === this.expected.length)) {
		true; /// same length
		for (var i = 0, l = arguments.length; i < l; i++) {
			if (arguments[i] === this.expected[i]) {
				true; /// same value
			}
			else { return this.passed = false; }
		}
		return this.passed = true;
	}
	return this.passed = false;
}, expected: null, called: false, actual: null };

module.exports = ctx;