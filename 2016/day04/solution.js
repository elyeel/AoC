import fs from 'fs';
const regex = /([a-z-]+)-(\d+)\[([a-z]{5})\]/;
const input = fs.readFileSync('./2016/day04/data.txt', 'utf-8').split('\n');

const solution = (input) => {
	const resultArr = input.map((line) => {
		const chars = {};
		const [ ln, str, sectorId, checkSum ] = line.match(regex);
		str.split('').forEach((c) => {
			if (c.match(/[a-z]/)) {
				chars[c] ? chars[c]++ : (chars[c] = 1);
			}
		});

		let strArr = Object.entries(chars)
			.sort((a, b) => {
				if (a[1] === b[1]) {
					return a[0].localeCompare(b[0]); // sort according to a..z
				} else {
					return b[1] - a[1];
				}
			})
			.slice(0, 5);

		// console.log({ strArr, checkSum });

		const check = checkSum
			.split('')
			.every((char) => strArr.some((c) => c[0] === char));
		if (check) return +sectorId;
	});
	console.log(resultArr);
	return resultArr.reduce((p, c) => (c ? p + c : p + 0), 0);
};

console.log(solution(input));
