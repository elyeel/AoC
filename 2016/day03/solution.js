import fs from 'fs';
const input = fs
	.readFileSync('./2016/day03/data.txt', 'utf-8')
	.split('\n')
	.map((x) => x.trim().split(/\s+/).map((x) => +x).sort((a, b) => a - b));
const vInput = fs
	.readFileSync('./2016/day03/data.txt', 'utf-8')
	.trim()
	.split(/\n/)
	.map((x) => x.trim().split(/\s+/).map((x) => +x));
console.log(vInput.length);

const solution = (arr, p = 1) => {
	if (p === 2) {
		// create vertical input from row input
		const vertical = [];
		for (let i = 0; i < 3; ++i) {
			for (let j = 0; j < arr.length; ++j) {
				vertical.push(arr[j][i]);
			}
		}
		let verticalGroup = [];
		for (let i = 0; i < vertical.length; i += 3) {
			verticalGroup.push([ vertical[i], vertical[i + 1], vertical[i + 2] ]);
		}
		verticalGroup = verticalGroup.map((x) => x.sort((a, b) => a - b));
		// console.log(verticalGroup);
		const result = verticalGroup.map(
			(triangle) => (triangle[0] + triangle[1] > triangle[2] ? true : false)
		);
		return result.filter((x) => x === true).length;
	} else {
		const result = arr.map(
			(triangle) => (triangle[0] + triangle[1] > triangle[2] ? true : false)
		);
		return result.filter((x) => x === true).length;
	}
};

console.log('Part 1:', solution(input));
console.log('Part 2:', solution(vInput, 2));
