function targetted(method) {
	method.this = function() { return method(this); };
}


var passage = (function() {
	function passage() {
		var parts = Array.prototype.map.call(arguments, function(p) {
			if (typeof p === "string") {
				var html = document.createDocumentFragment(),
					last_para;

				function add_para() {
					return html.appendChild(document.createElement("P"));
				}

				p.replace(/(?:^|\r?\n(\r?\n)?)[ \t]*([^\r\n]*)/g, function(m, para, text) {
					text = document.createTextNode(text);

					if (para) {
						last_para = add_para();
					}
					else {
						if (!last_para) { // no paras so far
							last_para = add_para();
						}
						else { // para exists; add newline
							last_para.appendChild(document.createElement("BR"));
						}

					}

					last_para.appendChild(text);
				});

				return html;
			}
			else {
				return p;
			}
		});


		return {
			parts: parts,
			run: passage.run.this
		};
	}

	var model = passage.model = document.createElement("DIV");
	model.className = "passage";


	passage.run = function(p) {
		var html = passage.model.cloneNode(true);


		p.parts.forEach(function(p) {
			if (p instanceof DocumentFragment) {
				html.appendChild(p.cloneNode(true));
			}
		});

		document.body.appendChild(html);
	};
	targetted(passage.run);

	return passage;
})();