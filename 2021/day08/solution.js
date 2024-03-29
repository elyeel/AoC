import fs from 'fs';
const data = fs
	.readFileSync('./2021/day08/data.txt', 'utf-8')
	.split(/\n/)
	.map((x) => x.split(' | ').map((x) => x.split(' ')));

// console.log(data);
const solution = (lines, p = 1) => {
	const num = {
		2: 1,
		3: 7,
		4: 4,
		7: 8
	};
	const number = {};
	const uniqueLength = [ 2, 4, 3, 7 ];
	const result = lines.map(([ input, output ]) => {
		// console.log([ ...input, ...output ]);
		if (p === 1)
			return output.map((x) => {
				if (uniqueLength.some((y) => y === x.length)) return num[x.length];
			});
		else {
			// deduction process
			const one = input.filter((pattern) => pattern.length === 2)[0].split('');
			const seven = input
				.filter((pattern) => pattern.length === 3)[0]
				.split('');
			const four = input.filter((pattern) => pattern.length === 4)[0].split('');
			const eight = input
				.filter((pattern) => pattern.length === 7)[0]
				.split('');
			// console.log({ one, four, seven });

			const fiveChars = input.filter((patterns) => patterns.length === 5);
			const sixChars = input.filter((patterns) => patterns.length === 6);
			//find three from fiveChars
			const three = fiveChars
				.filter((pattern) =>
					seven.every((y) => pattern.split('').some((x) => x === y))
				)[0]
				.split('');
			// console.log(three);

			//find nine from sixChars
			const nine = sixChars
				.filter((pattern) =>
					three.every((x) => pattern.split('').some((y) => y === x))
				)[0]
				.split('');
			// console.log(nine);

			// find six from sixchars
			const six = sixChars
				.filter(
					(pattern) =>
						!seven.every((x) => pattern.split('').some((y) => y === x))
				)[0]
				.split('');
			// console.log(six, six.join(''));

			//filter out zero from other sixChars
			const zero = sixChars
				.filter(
					(pattern) => pattern !== nine.join('') && pattern !== six.join('')
				)[0]
				.split('');
			// console.log(zero);

			// find two from fiveChars using either six or nine, must have 5 out of 6 chars from six or nine
			const two = fiveChars
				.filter((pattern) => {
					let count = 0;
					pattern.split('').forEach((char) => {
						if (nine.some((x) => x === char)) count++;
					});
					if (count !== 5) return pattern;
				})[0]
				.split('');
			// console.log(two);

			// filter out five from two and three patterns
			const five = fiveChars
				.filter(
					(pattern) => pattern !== two.join('') && pattern !== three.join('')
				)[0]
				.split('');
			// console.log(five);

			number[6] = six;
			number[1] = one;
			number[2] = two;
			number[3] = three;
			number[4] = four;
			number[5] = five;
			number[7] = seven;
			number[8] = eight;
			number[9] = nine;
			number[0] = zero;
			// console.log(number);

			const outputNumber = output
				.map((pattern) => {
					for (const [ num, chars ] of Object.entries(number)) {
						// console.log('here', { num, chars, pattern });
						if (
							chars.length === pattern.length &&
							chars.every((x) => pattern.includes(x))
						)
							return num;
					}
					// Object.entries(number).forEach(([ num, chars ]) => {
					// 	if (chars.every((x) => pattern.split('').some((y) => y === x)))
					// 		return num;
					// });
				})
				.join('');
			// console.log(outputNumber);
			return +outputNumber;
		}
	});
	// console.log(result);
	if (p === 1) return result.flat().filter((x) => x !== undefined).length;
	else return result.reduce((a, c) => a + c);
};

console.log(solution(data, 2));
