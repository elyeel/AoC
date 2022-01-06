import md5 from 'md5';

const input = 'uqwqemis'; //puzzle input
// const input = 'abc'; //sample input

// console.log(md5(`${input}3231929`));
// console.log(md5(`${input}5017308`));

const solution = (input, p = 1) => {
	let charCount = 0;
	let num = 1;
	const resultP2 = new Array(8).fill(-1);
	const regex = /^0{5}([0-7])(\w)/;
	const result = [];
	while (charCount < 8) {
		const hashed = md5(input + num);
		if (hashed.slice(0, 5) === '00000' && p === 1) {
			charCount++;
			result.push(hashed[5]);
			console.log(hashed);
		} else {
			if (regex.test(hashed)) {
				const [ str, position, char ] = hashed.match(regex);
				if (resultP2[position] < 0) {
					charCount++;
					resultP2[position] = char;
					console.log({ str, position, char, num, hashed, num5: hashed[5] });
				}
			}
		}

		num++;
	}
	return p === 1 ? result.join('') : resultP2.join('');
};

console.log(solution(input, 2));
