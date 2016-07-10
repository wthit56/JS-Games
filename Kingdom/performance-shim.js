performance.now = (
	performance.now ||
	function() { return Date.now(); }
);