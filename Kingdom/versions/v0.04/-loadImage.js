var loadImage = (function () {
	function load_full() {
		var args = Array.prototype.slice.call(arguments), progress = {
			images: {}, loaded: 0, total: 0, complete: false, callback: null, template: args.shift()
		};
		
		var callback = progress.callback = args.pop(), context = this;
		progress.total = args.length;
		
		function onload() {
			progress.loaded++;
			if (progress.loaded >= progress.total) {
				progress.complete = true;
				if (progress.callback) { progress.callback.apply(context, args); }
			}
		}
		
		args.forEach(function(v, i) {
			var img = new Image();
			img.onload = onload;
			progress.images[v] = img; args[i] = img;
			img.src = progress.template.replace(/%f/, v);
		});
		
		return progress;
	}
	
	function noCallback() { }
	
	function load() {
		return load.templated.apply(this, ["%f"].concat(arguments));
	}
	load.templated = function load_templated() {
		if (arguments[arguments.length - 1] instanceof Function) {
			return load_full.apply(this, arguments);
		}
		else {
			return load_full.apply(this, [].concat(arguments).push(noCallback));
		}
	};
	return load;
})();
if (typeof module !== "undefined") { module.exports = loadImage; }