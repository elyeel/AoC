import fs from 'fs';
const input = fs
	.readFileSync('./2021/day07/data.txt', 'utf-8')
	.trim()
	.split(',')
	.map((x) => +x);

console.log(input);

const solution = (input) => {
	const result = [];
	for (let i = 0; i < input.length; ++i) {
		const cost = input.reduce((a, c) => a + Math.abs(c - i), 0);
		result.push({ to: i, cost });
	}
	return result.sort((a, b) => a.cost - b.cost);
};

const solution2 = (input) => {
	const result = [];
	for (let i = 0; i < input.length; ++i) {
		const cost = input.reduce(
			(a, c) => a + Math.abs(c - i) * (1 + (Math.abs(c - i) - 1) * 0.5),
			0
		);
		result.push({ to: i, cost });
	}
	return result.sort((a, b) => a.cost - b.cost);
};

console.log(solution(input)[0]);
console.log(solution2(input)[0]);
