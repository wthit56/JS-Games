module.exports = function() {
	this.complete = false;
	this.load = function() {
		this.complete = true;
		if (this.onload instanceof Function) {
			this.onload.call(this);
		}
	};
	
};