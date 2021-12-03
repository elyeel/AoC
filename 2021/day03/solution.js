import fs from 'fs';
const input = fs
	.readFileSync('./2021/day03/data.txt', 'utf-8')
	.trim()
	.split('\n')
	.map((x) => x.split('').map((x) => +x));

console.log(input.length);

const solution = (input, p = 1) => {
	const gamma = [];
	const epsilon = [];
	for (let i = 0; i < input[0].length; ++i) {
		const obj = { ones: 0, zeros: 0 };
		for (let j = 0; j < input.length; ++j) {
			if (input[j][i] === 1) {
				obj.ones++;
			} else {
				obj.zeros++;
			}
		}
		if (obj.ones > input.length / 2) {
			gamma.push('1');
			epsilon.push('0');
		} else {
			gamma.push('0');
			epsilon.push('1');
		}
	}

	return parseInt(gamma.join(''), 2) * parseInt(epsilon.join(''), 2);
	console.log(gamma.join(''), epsilon.join(''));
};

const dominant = (input) => {
	let arr = [ ...input ];
	for (let i = 0; i < input[0].length; ++i) {
		const obj = { ones: 0, zeros: 0 };
		let dominant;
		for (let j = 0; j < arr.length; ++j) {
			if (arr[j][i] === 1) {
				obj.ones++;
			} else {
				obj.zeros++;
			}
		}
		// console.log(obj);
		if (obj.ones > arr.length / 2) dominant = 1;
		if (obj.zeros > arr.length / 2) dominant = 0;
		if (obj.zeros === obj.ones) {
			dominant = 1;
			return arr
				.filter((x) => {
					if (x[i] === dominant) return x;
				})[0]
				.join('');
		}
		const oxy = arr.filter((x) => {
			if (x[i] === dominant) return x;
		});
		// console.log(oxy);
		arr = [ ...oxy ];

		// const oxy = oxyArr.filter((x) => {
		// 	if (x[i] === dominant[i]) return x;
		// });
		// const co2 = co2Arr.filter((x) => {
		// 	if (x[i] === recessive[i]) return x;
		// });
		// oxyArr = [ ...oxy ];
		// co2Arr = [ ...co2 ];
	}
	return arr[0].join('');
};

const recessive = (input) => {
	let arr = [ ...input ];
	for (let i = 0; i < input[0].length; ++i) {
		const obj = { ones: 0, zeros: 0 };
		let recessive;
		for (let j = 0; j < arr.length; ++j) {
			if (arr[j][i] === 1) {
				obj.ones++;
			} else {
				obj.zeros++;
			}
		}
		// console.log(obj);
		if (obj.ones > arr.length / 2) recessive = 0;
		if (obj.zeros > arr.length / 2) recessive = 1;
		if (obj.zeros === obj.ones) {
			recessive = 0;
			return arr
				.filter((x) => {
					if (x[i] === recessive) return x;
				})[0]
				.join('');
		}
		const co2 = arr.filter((x) => {
			if (x[i] === recessive) return x;
		});
		// console.log(co2);
		arr = [ ...co2 ];
	}
	return arr[0].join('');
};

const solution2 = (data) => {
	const result = [];
	result.push(dominant(data));

	result.push(recessive(data));
	return parseInt(result[0], 2) * parseInt(result[1], 2);
};
console.log(solution(input));
console.log(solution2(input));
