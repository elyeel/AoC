import fs from 'fs';
const regex = /([a-z-]+)-(\d+)\[([a-z]{5})\]/;
const input = fs.readFileSync('./2016/day04/data.txt', 'utf-8').split('\n');

const solution = (input, p = 1) => {
	const encrypted = [];
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
		if (check) {
			encrypted.push({
				sentence: str,
				shifts: +sectorId % 26,
				sectorId: +sectorId
			});
			return +sectorId;
		}
	});
	// console.log(resultArr, encrypted);
	const chars = 'a b c d e f g h i j k l m n o p q r s t u v w x y z'.split(
		' '
	);
	if (p === 1) return resultArr.reduce((p, c) => (c ? p + c : p + 0), 0);
	else {
		const regex = /north/;
		const decryptedSentence = encrypted.map((str) => {
			const decryption = str.sentence.split('').map((char) => {
				if (char === '-') return ' ';
				else {
					const idx =
						chars.indexOf(char) + str.shifts > 25
							? (chars.indexOf(char) + str.shifts) % 26
							: chars.indexOf(char) + str.shifts;
					return chars[idx];
				}
			});
			if (regex.test(decryption.join('')))
				console.log(
					`Found the northpole objects at sectorId: ${+str.sectorId}`
				);
			return { decrypted: decryption.join(''), sectorId: str.sectorId };
		});
		return decryptedSentence;
	}
};

console.log(solution(input, 2));
// a b c d e f g h i j k l m n o p q r s t u v w x y z
// console.log(1_000_000);
