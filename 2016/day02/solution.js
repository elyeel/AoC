import fs from 'fs';
const input = fs.readFileSync('./2016/day02/data.txt', 'utf-8').split('\n');

const cube = { x: 0, y: 0 };
const cube2 = { x: -2, y: 0 };
const digit = {
	'-1/1': 1,
	'0/1': 2,
	'1/1': 3,
	'-1/0': 4,
	'0/0': 5,
	'1/0': 6,
	'-1/-1': 7,
	'0/-1': 8,
	'1/-1': 9
};
const digit2 = {
	'0/2': 1,
	'-1/1': 2,
	'0/1': 3,
	'1/1': 4,
	'-2/0': 5,
	'-1/0': 6,
	'0/0': 7,
	'1/0': 8,
	'2/0': 9,
	'-1/-1': 'A',
	'0/-1': 'B',
	'1/-1': 'C',
	'0/-2': 'D'
};

const solution = (input, cube, p = 1) => {
	const position = input.map((line) => {
		const prev = { x: cube.x, y: cube.y };
		line.split('').map((move) => {
			// do move
			switch (move) {
				case 'U':
					cube.y++;
					break;
				case 'D':
					cube.y--;
					break;
				case 'L':
					--cube.x;
					break;
				case 'R':
					++cube.x;
					break;
				default:
					console.log('Sorry, invalid move code!');
			}
			// check if x,y within -1 to 1 after each move
			//    1
			//  2 3 4
			//5 6 7 8 9
			//  A B C
			//    D
			if (p === 1) {
				// part1
				if (Math.abs(cube.x) > 1 || Math.abs(cube.y) > 1) {
					cube.x = prev.x;
					cube.y = prev.y;
				} else {
					prev.x = cube.x;
					prev.y = cube.y;
				}
			} else {
				// part2
				// special case (1, 5, 9, D)
				if (
					(Math.abs(cube.x) === 2 && Math.abs(cube.y) === 1) ||
					(Math.abs(cube.x) === 2 && Math.abs(cube.y) === 2) ||
					(Math.abs(cube.x) === 1 && Math.abs(cube.y) === 2) ||
					Math.abs(cube.x) > 2 ||
					Math.abs(cube.y) > 2
				) {
					cube.x = prev.x;
					cube.y = prev.y;
				} else {
					prev.x = cube.x;
					prev.y = cube.y;
				}
			}
		});
		return p === 1
			? digit[`${cube.x}/${cube.y}`]
			: digit2[`${cube.x}/${cube.y}`];
	});

	return position;
};

console.log(solution(input, cube));
console.log(solution(input, cube2, 2));
