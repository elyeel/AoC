import fs from 'fs';
let input = fs.readFileSync('./2015/day19/data.txt', 'utf8'); //.split("\n");
// .map((x) => parseInt(x));
// console.log(input.length);
// const regex = /[A-Z]{1}[a-z]?/g;

// const molecules = input.pop().match(regex); //array
// const combinationObj = [];
// input.forEach((x) => {
//   if (x) {
//     const [key, value] = x.split(" => ");
//     combinationObj.push({ [key]: [...value.match(regex)] });
//   }
// });

// console.log(molecules.length);
// const RnAr = molecules.reduce(
//   (a, c) => a + (c === "Rn" || c === "Ar" ? 1 : 0),
//   0
// );
// const Y = molecules.reduce((a, c) => a + (c === "Y" ? 1 : 0), 0);
// console.log(molecules.length, RnAr, Y);
// console.log(combinationObj.length);

function test() {
	input = input.split('').reverse().join('').split('\n');

	var molecule = input.shift();
	input.shift(); // empty line

	input = input.map(function(a) {
		return a.split(' >= ');
	});

	var uniqueNewMolecules = {};
	var i, y;

	for (i = 0; i < molecule.length; i++) {
		for (y = 0; y < input.length; y++) {
			if (molecule.substr(i, input[y][1].length) === input[y][1]) {
				uniqueNewMolecules[
					molecule.slice(0, i) +
						input[y][0] +
						molecule.slice(i + input[y][1].length)
				] = true;
			}
		}
	}

	var steps = 0;
	var lookup = {};
	var replaced = false;

	input = input.map(function(a) {
		lookup[a[0]] = a[1];

		return a[0];
	});

	var regexp = new RegExp('(' + input.join('|') + ')', 'g');
	var replaceCallback = function(matched) {
		replaced = true;

		steps++;

		return lookup[matched];
	};

	do {
		replaced = false;
		molecule = molecule.replace(regexp, replaceCallback);
	} while (replaced);

	return [ Object.keys(uniqueNewMolecules).length, steps ];
}

console.log(test());
