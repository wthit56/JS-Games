var raf = function() {
	return requestAnimationFrame.apply(this, arguments);
};

function queuer(action) {
	var queued = false;
	function done() {
		queued = false;
		action();
	}
	
	return function() {
		if (!queued) {
			queued = true;
			raf(done);
		}
	};
}

function on(dom, event, listener, capture) {
	dom.addEventListener(event, listener, capture);
}
on.stop = function(dom, event, listener, capture) {
	dom.removeEventListener(event, listener, capture);
};
