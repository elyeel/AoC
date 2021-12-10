import fs from 'fs';
const data = fs
	.readFileSync('./2021/day05/data.txt', 'utf-8')
	.trim()
	.split(/\n/)
	.map((x) => {
		const [ st, x1, y1, x2, y2 ] = x.match(/(\d+),(\d+) -> (\d+),(\d+)/);
		return { x1: +x1, y1: +y1, x2: +x2, y2: +y2 };
	});

// console.log(data);
const maxCoord = (input) => {
	const xy = { x: 0, y: 0 };
	input.forEach((element) => {
		if (xy.x < element.x1 || xy.x < element.x2)
			element.x1 >= element.x2 ? (xy.x = element.x1) : (xy.x = element.x2);
		if (xy.y < element.y1 || xy.y < element.y2)
			element.y1 >= element.y2 ? (xy.y = element.y1) : (xy.y = element.y2);
	});
	// console.log(xy);
	return xy;
};

const drawLine = (x1, y1, x2, y2, map) => {
	for (let y = y1; y <= y2; y++) {
		for (let x = x1; x <= x2; ++x) {
			// console.log({ x, y });
			map[y][x] === '.' ? (map[y][x] = 1) : ++map[y][x];
		}
	}
};

const drawDiag = (x1, y1, x2, y2, map) => {
	if (x1 < x2) {
		//x axis going from left to right
		if (y1 < y2) {
			for (let y = 0; y <= y2 - y1; y++) {
				map[y + y1][x1 + y] === '.'
					? (map[y + y1][x1 + y] = 1)
					: map[y + y1][x1 + y]++;
			}
		} else {
			for (let y = 0; y <= y1 - y2; y++) {
				map[y1 - y][x1 + y] === '.'
					? (map[y1 - y][x1 + y] = 1)
					: map[y1 - y][x1 + y]++;
			}
		}
	} else {
		//x axis going from right to left
		if (y1 < y2) {
			for (let y = 0; y <= y2 - y1; y++) {
				map[y1 + y][x1 - y] === '.'
					? (map[y1 + y][x1 - y] = 1)
					: map[y1 + y][x1 - y]++;
			}
		} else {
			for (let y = 0; y <= y1 - y2; y++) {
				map[y1 - y][x1 - y] === '.'
					? (map[y1 - y][x1 - y] = 1)
					: map[y1 - y][x1 - y]++;
			}
		}
	}
};

// console.log(maxCoord(data));
const solution = (data, p = 1) => {
	const maxXY = maxCoord(data);
	const venture = [];
	for (let y = 0; y <= maxXY.y; y++) {
		const line = new Array(maxXY.x + 1).fill('.');
		venture.push(line);
	}

	// console.log(venture);
	for (let i = 0; i < data.length; i++) {
		let x1, x2, y1, y2;
		if (data[i].x1 < data[i].x2) {
			x1 = data[i].x1;
			x2 = data[i].x2;
		} else {
			x1 = data[i].x2;
			x2 = data[i].x1;
		}
		if (data[i].y1 < data[i].y2) {
			y1 = data[i].y1;
			y2 = data[i].y2;
		} else {
			y1 = data[i].y2;
			y2 = data[i].y1;
		}
		// console.log({ x1, y1, x2, y2 });
		if (x1 === x2 || y1 === y2) drawLine(x1, y1, x2, y2, venture);
		if (x2 - x1 === y2 - y1 && p === 2)
			drawDiag(data[i].x1, data[i].y1, data[i].x2, data[i].y2, venture);

		// venture.forEach((x) => console.log(x.join('')));
		// console.log('');
	}
	let result = 0;
	venture.forEach((element) => {
		// console.log(element);
		element.forEach((e) => (e >= 2 ? result++ : null));
	});
	return result;
};

console.log(solution(data, 2));
