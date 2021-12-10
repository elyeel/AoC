import fs from 'fs';
const data = fs
	.readFileSync('./2021/day09/data.txt', 'utf-8')
	.split(/\n/)
	.map((x) => x.split('').map(Number));

// console.log(data);

const searchBasin = (x, y, map) => {
	if (map[y][x] === 1) return 0;
	map[y][x] = 1;

	let size = 1;

	if (x - 1 >= 0) size += searchBasin(x - 1, y, map);
	if (x + 1 < map[y].length) size += searchBasin(x + 1, y, map);
	if (y - 1 >= 0) size += searchBasin(x, y - 1, map);
	if (y + 1 < map.length) size += searchBasin(x, y + 1, map);

	return size;
};

const solution = (height) => {
	const riskLevel = [];
	const heightMap = [];
	for (let y = 0; y < height.length; y++) {
		const heightLine = [];
		for (let x = 0; x < height[y].length; x++) {
			const element = height[y][x];
			element === 9 ? heightLine.push(1) : heightLine.push(0);
			const neighbours = {};
			// console.log(x, y);
			y - 1 >= 0 ? (neighbours.up = height[y - 1][x]) : null;
			y + 1 < height.length ? (neighbours.down = height[y + 1][x]) : null;
			x - 1 >= 0 ? (neighbours.left = height[y][x - 1]) : null;
			x + 1 < height[y].length ? (neighbours.right = height[y][x + 1]) : null;
			if (Object.values(neighbours).every((neighbour) => neighbour > element))
				riskLevel.push(element + 1);
		}
		heightMap.push(heightLine);
	}
	// console.log(heightMap);

	const basinSize = [];
	for (let y = 0; y < heightMap.length; y++) {
		for (let x = 0; x < heightMap[y].length; x++) {
			const size = searchBasin(x, y, heightMap);
			if (size > 0) basinSize.push(size);
		}
	}
	// console.log(basinSize);
	const part2 = basinSize
		.sort((a, b) => b - a)
		.slice(0, 3)
		.reduce((a, c) => a * c);
	return { part1: riskLevel.reduce((a, c) => a + c), part2 };
};

console.log(solution(data));

// function floodfill(i, j, map) {
// 	if (map[i][j] === 1) return 0; // check node hasn't been visited
// 	map[i][j] = 1; // mark node as visited

// 	// count neighbors
// 	let size = 1;

// 	if (i - 1 >= 0) {
// 		size += floodfill(i - 1, j, map);
// 	}
// 	if (i + 1 < map.length) {
// 		size += floodfill(i + 1, j, map);
// 	}
// 	if (j - 1 >= 0) {
// 		size += floodfill(i, j - 1, map);
// 	}
// 	if (j + 1 < map[i].length) {
// 		size += floodfill(i, j + 1, map);
// 	}

// 	return size;
// }

// function part2(lines) {
// 	const map = Array(lines.length)
// 		.fill(0)
// 		.map((x, i) =>
// 			Array(lines[0].length).fill(0).map((x, j) => (lines[i][j] === 9 ? 1 : 0))
// 		);
// 	console.log(map);
// 	let bassins = [];
// 	// console.log(map.map((x) => x.join``).join`\n`);
// 	for (let i = 0; i < lines.length; i++) {
// 		const line = lines[i];
// 		for (let j = 0; j < line.length; j++) {
// 			const size = floodfill(i, j, map);

// 			if (size > 0) {
// 				console.log('');
// 				console.log(map.map((x) => x.join``).join`\n`);
// 				bassins.push(size);
// 			}
// 		}
// 	}
// 	bassins.sort((a, b) => b - a);
// 	console.log(bassins[0] * bassins[1] * bassins[2]);
// }

// part2(data);
