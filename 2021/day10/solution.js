import fs from 'fs';
const data = fs
	.readFileSync('./2021/day10/data.txt', 'utf-8')
	.trim()
	.split(/\n/)
	.map((x) => x.split(''));

// console.log(data);
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
const closingPoints = {
	')': 1,
	']': 2,
	'}': 3,
	'>': 4
};

const solution = (line, p = 1) => {
	const error = [];
	const completion = [];

	line.forEach((e) => {
		const char = [];

		let corrupted = false;
		for (let i = 0; i < e.length; i++) {
			const elem = e[i];
			if (elem === '{' || elem === '(' || elem === '[' || elem === '<') {
				char.push(closingChar[elem]);
			} else {
				const expect = char.pop();
				if (expect !== elem) {
					error.push(elem);
					corrupted = true;
					break;
				}
			}
		}

		if (!corrupted && char.length > 0 && p === 2) {
			// need to reverse the char
			const lnCompletionScore = char
				.reverse()
				.reduce((a, c) => a * 5 + closingPoints[c], 0);
			// console.log(char, lnCompletionScore);
			completion.push(lnCompletionScore);
		}
	});
	// console.log(error, points[error[0]]);
	const med = Math.floor(completion.length / 2);
	const part2 = completion.sort((a, b) => a - b)[med];
	const part1 = error.reduce((a, c) => a + points[c], 0);
	return { part1, part2 };
};

console.log(solution(data, 2));
