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

const solution = (input, start, move, p = 1) => {
	const coords = new Set();
	input.forEach((element) => {
		const direction = move[start.point][element.dir];
		switch (direction) {
			case 'N':
				start.y += element.dist;
				break;
			case 'S':
				start.y -= element.dist;
				break;
			case 'E':
				start.x += element.dist;
				break;
			case 'W':
				start.x -= element.dist;
				break;
			default:
				console.log('Sorry, error in directional rotation');
		}
		if (p > 1) {
			if (coords.has(`${start.x}-${start.y}`))
				return Math.abs(start.x) + Math.abs(start.y);
			else coords.add(`${start.x}-${start.y}`);
		}

		start.point = direction;
		// console.log(start);
	});
	return Math.abs(start.x) + Math.abs(start.y);
};

console.log(solution(input, start, move));
