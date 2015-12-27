function Loader(name) {
	if (name) { this.name = name; }
	this.config = {}; this.assets = {};
	this.complete = 0; this.total = 0;
}
Loader.prototype = {
	base: function(base) {
		this.config.base = base;
		return this;
	},
	images: function() {
		var complete = (function() {
			console.log("complete");
			this.loader.complete++;
			this.loader.assets[this.name] = this;
			this.onload = null;
			if ((this.loader.complete === this.loader.total) && this.loader.onload) {
				this.loader.onload();
			}
		});
		
		var images = arguments;
		if ((images.length === 1) && Array.isArray(images[0])) { images = images[0]; }
		
		this.total += images.length;
		for (var i = 0, l = images.length; i < l; i++) {
			var src = images[i];
			if (typeof src === "string") {
				var img = new Image();
				img.name = src;
				if (this.config.base) { src = src.replace(/[\W\w]*/, this.config.base); }
				img.loader = this;
				img.onload = complete;
				console.log("start loading " + src);
				img.src = src;
			}
			else {
				src.onload = complete;
			}
		}
		
		return this;
	},
	then: function(then) {
		if (this.onload) {
			var loader = this;
			var oc = this.onload;
			this.onload = function() {
				oc.call(loader);
				then.call(loader);
			};
		}
		else {
			this.onload = function() {
				then.call(loader);
			}
		}
		
		return this;
	}
};

Loader.base = function(base) {
	return new Loader().base(base);
};
Loader.images = function() {
	var loader = new Loader();
	return loader.images.apply(loader, arguments);
};

/*
var Loader = {
	isLoader: true,
	base: function(base) {
		return {
			base: base,
			images: Loader.images,
			completed: 0, total: 0,
			then: function(callback) {
				this.thenDo = callback;
			}
		};
	},
	images: function() {
		var imgs = [].concat(arguments);
		this.total += imgs;
		this.images = {};
		imgs.forEach(function() {
			new Image()
		});
	}
};
*/