import fs from 'fs';
const data = fs
	.readFileSync('./2021/day11/data.txt', 'utf-8')
	.trim()
	.split(/\n/)
	.map((x) => x.split('').map((x) => +x));

// console.log(data);

const addPowerToAdjacent = (x, y, map) => {
	if (map[y][x] === '*') return;
	map[y][x]++;
	if (map[y][x] < 9) return;
	if (map[y][x] >= 9) map[y][x] = '*';

	// let size = 1;

	if (x - 1 >= 0) addPowerToAdjacent(x - 1, y, map);
	if (x + 1 < map[y].length) addPowerToAdjacent(x + 1, y, map);
	if (y - 1 >= 0) addPowerToAdjacent(x, y - 1, map);
	if (y + 1 < map.length) addPowerToAdjacent(x, y + 1, map);
	if (x - 1 >= 0 && y + 1 < map.length) addPowerToAdjacent(x - 1, y + 1, map);
	if (x - 1 >= 0 && y - 1 >= 0) addPowerToAdjacent(x - 1, y - 1, map);
	if (x + 1 < map[y].length && y + 1 < map.length)
		addPowerToAdjacent(x + 1, y + 1, map);
	if (x + 1 < map[y].length && y - 1 >= 0)
		addPowerToAdjacent(x + 1, y - 1, map);

	// map[y][x] = 0
};

const solution = (octopuses, step = 1) => {
	let count = 0;
	for (let i = 0; i < step; i++) {
		console.log(i + 1); // step#
		let innerCount = 0;
		// check for any octopus had value 9 and increase adjacent by 1
		for (let y = 0; y < octopuses.length; y++) {
			for (let x = 0; x < octopuses[y].length; x++) {
				if (octopuses[y][x] >= 9) addPowerToAdjacent(x, y, octopuses);
				// octopuses[y][x] = 0;
			}
			// console.log(octopuses[y].join``);
		}

		// using for loop to create each step
		for (let y = 0; y < octopuses.length; y++) {
			for (let x = 0; x < octopuses[y].length; x++) {
				// if (octopuses[y][x] === 9) addPowerToAdjacent(x, y, octopuses);
				if (octopuses[y][x] === '*') {
					octopuses[y][x] = 0;
					count++;
					innerCount++;
				} else octopuses[y][x]++;
			}
			console.log(octopuses[y].join``);
		}

		if (innerCount === octopuses.length * octopuses[1].length)
			console.log(`All octopuses flashed together at step ${i + 1}`);
	}
	// console.log(octopuses);
	return count;
};

console.log(solution(data, 100)); //change step# to solve part1/part2
