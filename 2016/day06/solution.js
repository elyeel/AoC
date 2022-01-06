import fs from 'fs';

const lines = fs
	.readFileSync('./2016/day06/data.txt', 'utf-8')
	.split(/\n/)
	.map((x) => x.split(''));

// console.log(lines);

const solution = (lines, part = 1) => {
	const mostFrequentChar = [];
	for (let col = 0; col < lines[0].length; col++) {
		const chars = {};
		for (let row = 0; row < lines.length; row++) {
			chars[lines[row][col]]
				? chars[lines[row][col]]++
				: (chars[lines[row][col]] = 1);
		}
		mostFrequentChar.push(
			part === 1
				? Object.entries(chars).sort((a, b) => b[1] - a[1])[0][0]
				: Object.entries(chars).sort((a, b) => a[1] - b[1])[0][0]
		);
	}

	return mostFrequentChar.join('');
};

console.log(solution(lines, 3));
