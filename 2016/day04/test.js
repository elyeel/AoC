countBy = (input, keyGetter) => {
	var keyResolver = {
		function: function(d) {
			return keyGetter(d);
		},
		string: function(d) {
			return d[keyGetter];
		},
		undefined: function(d) {
			return d;
		}
	};
	var result = {};
	input.trim().split('').forEach(function(d) {
		var keyGetterType = typeof keyGetter;
		var key = keyResolver[keyGetterType](d);
		if (result.hasOwnProperty(key)) {
			result[key]++;
		} else {
			result[key] = 1;
		}
	});
	return result;
};
ans = 0;
document.body.innerText.trim().split('\n').forEach((ss) => {
	ms = /([a-z-]+)-(\d+)\[([a-z]{5})\]/.exec(ss);
	cs = countBy(ms[1].replace(/-/g, ''));
	xs = [];
	for (var c in cs) {
		xs.push([ cs[c], c ]);
	}
	if (
		xs
			.sort((a, b) => {
				if (a[0] === b[0]) {
					return a[1].localeCompare(b[1]);
				} else {
					return b[0] - a[0];
				}
			})
			.slice(0, 5)
			.map((x) => x[1])
			.join('') === ms[3]
	) {
		ans += parseInt(ms[2]);
	}
});
ans;
