import fs from 'fs';
const input = fs
	.readFileSync('./2016/day01/data.txt', 'utf-8')
	.trim()
	.split(', ')
	.map((x) => {
		const [ res, dir, dist ] = x.match(/(R|L)(\d+)/);
		return { dir, dist: +dist };
	});
console.log(input.filter((x) => x.dist > 100));

const move = {
	N: {
		L: 'W',
		R: 'E'
	},
	E: {
		L: 'N',
		R: 'S'
	},
	S: {
		L: 'E',
		R: 'W'
	},
	W: {
		L: 'S',
		R: 'N'
	}
};

const start = {
	x: 0,
	y: 0,
	point: 'N'
};
const coords = new Set();

const pathLogger = (start, incr, distance) => {
	// console.log(start, incr, distance);
	for (let i = 1; i <= distance; ++i) {
		const pathX = start.x + incr.x * i;
		const pathY = start.y + incr.y * i;
		if (coords.has(`${pathX}-${pathY}`))
			return Math.abs(pathX) + Math.abs(pathY);
		else coords.add(`${pathX}-${pathY}`);
	}
};

const solution = (input, start, move, p = 1) => {
	let pLStart = { x: start.x, y: start.y };
	const arrPart2 = [];
	input.forEach((element) => {
		const incr = {
			x: 0,
			y: 0
		};
		const direction = move[start.point][element.dir];
		switch (direction) {
			case 'N':
				start.y += element.dist;
				incr.y = 1;
				break;
			case 'S':
				start.y -= element.dist;
				incr.y = -1;
				break;
			case 'E':
				start.x += element.dist;
				incr.x = 1;
				break;
			case 'W':
				start.x -= element.dist;
				incr.x = -1;
				break;
			default:
				console.log('Sorry, error in directional turn');
		}

		const part2 = pathLogger(pLStart, incr, element.dist);
		start.point = direction;
		if (p > 1 && part2) {
			arrPart2.push(part2);
		}
		pLStart = { x: start.x, y: start.y };
		// console.log(start);
	});
	return p === 1 ? Math.abs(start.x) + Math.abs(start.y) : arrPart2[0];
};

console.log(solution(input, start, move, 2));
