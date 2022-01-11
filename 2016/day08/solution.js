import fs from 'fs';
const operations = fs
	.readFileSync('./2016/day08/data.txt', 'utf-8')
	.split('\n');

// const screen = new Array(6).fill(new Array(50).fill(0));
const screen = new Map();
// initialize screen
for (let y = 0; y < 6; y++) {
	for (let x = 0; x < 50; x++) {
		screen.set(`${x}-${y}`, 0);
	}
}
console.log(operations.length, screen.size);

const rect = (xRect, yRect, screen) => {
	for (let y = 0; y < yRect; y++) {
		for (let x = 0; x < xRect; x++) {
			screen.set(`${x}-${y}`, 1);
		}
	}
};
// rect(3, 2, screen);
// for (const [ key, value ] of screen) {
// 	if (value === 1) console.log({ key, value });
// }

const rotate = (xOrY, xyValue, byValue, screen, size) => {
	const len = xOrY === 'x' ? size.y : size.x;
	let arr = [];
	for (let i = 0; i < len; i++) {
		const element = xOrY === 'x' ? `${xyValue}-${i}` : `${i}-${xyValue}`;
		const elemValue = screen.get(element);
		arr.push(elemValue);
		// console.log({ xOrY, elemValue, element });
	}
	// shifting process
	// cut element from the end
	const slicedEnd = arr.slice(-byValue);
	// put the sliced element to the front of array
	arr = slicedEnd.concat(arr);
	arr.splice(-byValue);
	// console.log(arr);

	for (let i = 0; i < len; i++) {
		const key = xOrY === 'x' ? `${xyValue}-${i}` : `${i}-${xyValue}`;
		screen.set(key, arr[i]);
		// console.log(screen.get(key));
	}
};
// rotate('x', 1, 1, screen, { x: 50, y: 6 });

const solution = (operations, screen) => {
	const size = { x: 50, y: 6 };
	const regexRect = /rect (\d+)x(\d+)/;
	const regexRotate = /rotate (row|column) ([x|y])=(\d+) by (\d+)/;

	operations.forEach((line, num) => {
		if (line.match(regexRect)) {
			const [ s, x, y ] = line.match(regexRect);
			rect(x, y, screen);
		} else {
			// console.log({ line, num });
			const [ s, rOrC, xOrY, xyValue, byValue ] = line.match(regexRotate);
			rotate(xOrY, xyValue, byValue, screen, size);
		}
	});

	const on = [ ...screen.values() ].filter((x) => x === 1).length;
	console.log(on);

	for (let y = 0; y < size.y; y++) {
		// const arr = [];
		let str = '';
		for (let x = 0; x < size.x; x++) {
			// arr.push(screen.get(`${x}-${y}`));
			screen.get(`${x}-${y}`) === 1 ? (str += '#') : (str += '.');
		}
		console.log(str);
	}
};

solution(operations, screen);
