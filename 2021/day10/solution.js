import fs from 'fs';
const data = fs
	.readFileSync('./2021/day10/data.txt', 'utf-8')
	.trim()
	.split(/\n/)
	.map((x) => x.split(''));

console.log(data);
// stack problem, LIFO

const closingChar = {
	'[': ']',
	'(': ')',
	'{': '}',
	'<': '>'
};
const points = {
	')': 3,
	']': 57,
	'}': 1197,
	'>': 25137
};

const solution = (line) => {
	const char = [];
	const error = [];

	line.forEach((e) => {
		for (let i = 0; i < e.length; i++) {
			const elem = e[i];
			if (elem === '{' || elem === '(' || elem === '[' || elem === '<') {
				char.push(closingChar[elem]);
			} else {
				const expect = char.pop();
				if (expect !== elem) {
					error.push(elem);
					break;
				}
			}
		}
	});
	// console.log(error, points[error[0]]);

	return error.reduce((a, c) => a + points[c], 0);
};

console.log(solution(data));
