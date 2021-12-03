import fs from 'fs';
const regex = /([a-z-]+)-(\d+)\[([a-z]{5})\]/;
const input = fs.readFileSync('./2016/day04/control.txt', 'utf-8').split('\n');

const solution = (input) => {
	const resultArr = input.map((line) => {
		const chars = {};
		const [ ln, str, sectorId, checkSum ] = line.match(regex);
		const strArr = [];
		str.split('').forEach((c) => {
			if (c.match(/[a-z]/)) {
				chars[c] ? chars[c]++ : (chars[c] = 1);
			}
		});
		strArr;

		const check = checkSum
			.split('')
			.every((char) => str.split('').some((c) => c === char));
		if (check) return +sectorId;
	});
	return resultArr.reduce((p, c) => (c ? p + c : p + 0), 0);
};

console.log(solution(input));
