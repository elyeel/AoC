const fs = require('fs');
const input = fs.readFileSync('./2015/day09/data.txt', 'utf8').split('\n');
console.log(input.length);

const regex = /(\w+) to (\w+) = (\d+)/;
const towns = new Set();
const townDist = new Map();
const real = input.map((x) => {
	const res = x.match(regex);
	if (res) {
		towns.add(res[1]);
		towns.add(res[2]);
		townDist.set(`${res[1]}${res[2]}`, parseInt(res[3]));
		townDist.set(`${res[2]}${res[1]}`, parseInt(res[3]));
		return [ res[1], res[2], res[3] ];
	}
});
// console.log(townDist);

const permutator = (inputArr) => {
	//input in array, returns array of permutation array
	let result = [];

	const permute = (arr, m = []) => {
		if (arr.length === 0) {
			result.push(m);
		} else {
			for (let i = 0; i < arr.length; i++) {
				let curr = arr.slice();
				let next = curr.splice(i, 1);
				permute(curr.slice(), m.concat(next));
			}
		}
	};

	permute(inputArr);

	return result;
};

// console.log(permutator([ 'a', 'b', 'c' ]));
const delivery = permutator([ ...towns ]);
// console.log(delivery);
const totalDist = delivery.map((combo) => {
	let total = 0;
	combo.forEach((element, i) => {
		if (townDist.get(element + combo[i + 1]))
			total += townDist.get(element + combo[i + 1]);
	});

	return total;
});
// console.log(totalDist);

console.log('Shortest Distance: ', Math.min(...totalDist));
console.log('Longest Distance: ', Math.max(...totalDist));
