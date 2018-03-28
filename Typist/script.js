var content = document.querySelector("#content");


var words = { all: [], by_key: {} };


var dict = {
	add: function(word) {
		add_dict_entry(word, dict);
	},
	remove: function(word) {
		
	},
	
	scan: {
		sofar: "", branch: dict,
		next: function(letter, result) {
			if (letter in this.branch) { // valid letter for available words
				var leaf = this.branch[letter];
				this.sofar += letter;
				if (leaf === true) { // end of word
					result.is = "end";
				}
				else { // middle of word
					this.branch = leaf;
					result.is = "added";
				}
			}
			else { // no available words allow this letter next
				result.is = "invalid";
			}
		},
		reset: function() {
			this.sofar = ""; this.branch = dict;
		}
	}
};

dict.scan.reset();

function add_dict_entry(word, into) {
	var length = word.length;
	if (length === 0) { return; }
	else if (length === 1) { // end of word
		into[word] = true; // mark end of word
	}
	else {
		var first = word[0];
		if (!(first in into)) { // not in tree
			into[first] = {}; // add branch
		}
		else if (into[first] === true) { // partial word already exists
			throw "Cannot add word; partial word already checked for.";
		}
		
		// continue to add the rest of the word
		add_dict_entry(word.substr(1), into[first]);
	}
}

var is_letter = /^[a-z]$/i;
window.addEventListener("keyup", function keydown(e) {
	var key = e.key;
	if (is_letter.test(key)) {
		var result;
		dict.scan.next(key, result = { is: "" });
		console.log(key, result.is);
		
		switch(result.is) {
			case "added": {
				// rewrite
				words.all.forEach(function(html) {
					var lword = html.lword;
					if (lword === "beast") { console.log(lword.indexOf(dict.scan.sofar)); }
					if (lword.indexOf(dict.scan.sofar) === 0) { // starts with typed letters
						html.progress(dict.scan.sofar.length);
					}
					else {
						html.progress(0);
					}
				});
			} break;
			
			case "invalid": {
				
			} break;
			
			case "end": {
				words.by_key[dict.scan.sofar].progress(0);
				words.all.forEach(function(html) {
					html.off();
				});
				dict.scan.reset();
				console.log("change content");
			} break;
		}
	}
	else { // not a letter
		if (e.which === 27) { // escape key
			words.all.forEach(function(html) {
				html.progress(0);
			});

			dict.scan.reset();
			console.log("scan reset");
		}
		// console.log(e.which);
	}
});

function setup_word(html) {
	var word = html.innerText;
	var lword = word.toLowerCase();
	
	html.types = {};
	html.className.split(" ").forEach(function(type) {
		html.types[type] = true;
	});
	
	words.by_key[lword] = html;
	words.all.push(html);
	dict.add(lword);
	
	html.removeChild(html.firstChild);
	html.word = word;
	html.lword = lword;
	
	var on = document.createElement("SPAN");
		on.className = "on"; on.innerText = "";
	var off = document.createElement("SPAN");
		off.className = "off"; off.innerText = word;
	html.appendChild(on);
	html.appendChild(off);
	
	html.progress = function(letters) {
		html.className = letters !== 0 ? "mid" : "";
		html.childNodes[0].innerText = html.word.substr(0, letters);
		html.childNodes[1].innerText = html.word.substr(letters);
	};
	html.off = function() {
		html.className = "off";
		html.innerText = html.word;
		delete html.word; delete html.lword;
		delete html.types;
		delete html.progress; delete html.off;
	};
}





