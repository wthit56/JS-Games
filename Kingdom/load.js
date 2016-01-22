function load(base) {
	var completed = 0, total = arguments.length - 1;
	
	function loaded() {
		if ((++completed >= total) && obj.then.callback) {
			obj.then.callback();
		}
	}
	var assets = {}, img;
	for (var i = 1, l = arguments.length; i < l; i++) {
		img = assets[arguments[i]] = new Image();
		img.onload = loaded;
		img.src = arguments[i].replace(/.*/, base);
	}

	var obj = {
		base: base || "$&",
		then: function(callback) {
			this.then.callback = callback;
			return this;
		},
		assets: assets
	};
	
	return obj;
}