import fs from 'fs';
const input = fs
	.readFileSync('./2021/day01/data.txt', 'utf-8')
	.split('\n')
	.map((x) => +x);

console.log(input);
const solution = (input, p = 1) => {
	const result = [];
	// part1
	// for (let i = 1; i < input.length; ++i) {
	// 	input[i - 1] < input[i]
	// 		? result.push('increased')
	// 		: result.push('decreased');
	// }

	//part2
	for (let i = 0; i < input.length; ++i) {
		if (i === input.length - 2) {
			input[i] + input[i + 1] + input[i + 2] < input[i + 1] + input[i + 2]
				? result.push('increased')
				: result.push('decreased');
		}
		if (i === input.length - 1) {
			input[i] + input[i + 1] < input[i + 1]
				? result.push('increased')
				: result.push('decreased');
		}
		if (i !== input.length - 1 && i !== input.length - 2) {
			input[i] + input[i + 1] + input[i + 2] <
			input[i + 1] + input[i + 2] + input[i + 3]
				? result.push('increased')
				: result.push('decreased');
		}
	}
	// console.log('test', result);
	return p === 1 ? result.filter((x) => x === 'increased').length : null;
};

console.log(solution(input));
