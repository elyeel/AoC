import fs from 'fs';
import permutator from '../../helpers/permutator.js';
const input = fs.readFileSync('./2015/day13/data.txt', 'utf8').split('\n');
console.log(input.length);

const regex = /(\w+) would (\w+) (\d+) happiness units by sitting next to (\w+)/;
const people = new Set();
const satDown = new Map();

input.forEach((line) => {
	const nextTo = line.match(regex);
	if (nextTo) {
		people.add(nextTo[1]);
		people.add(nextTo[4]);
		const num = nextTo[2] === 'gain' ? +nextTo[3] : -nextTo[3];
		satDown.set(`${nextTo[1]}${nextTo[4]}`, num);
	}
});
// console.log(satDown);

const combos = permutator([ ...people ]);
// console.log(combos);

const count = (combos) => {
	return combos.map((combo) => {
		let total = 0,
			l = combo.length;
		combo.forEach((elem, i) => {
			if (satDown.get(elem + combo[i + 1]) || satDown.get(elem + combo[0])) {
				if (i === l - 1) {
					total += satDown.get(elem + combo[0]) + satDown.get(combo[0] + elem);
				} else
					total +=
						satDown.get(elem + combo[i + 1]) + satDown.get(combo[i + 1] + elem);
			}
		});
		return total;
	});
};
// console.log(count(combos));
// console.log(people.size);
console.log('Optimal total change: ', Math.max(...count(combos)));

//part 2
const me = 'Ris';
people.forEach((person) => {
	satDown.set(me + person, 0);
	satDown.set(person + me, 0);
});
people.add('Ris');
// console.log(satDown);

// console.log(people.size);

const combos2 = permutator([ ...people ]);
let max2 = 0;
count(combos2).forEach((element) => {
	if (element > max2) max2 = element;
});
console.log('Optimal total change with me: ', max2);
