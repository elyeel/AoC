import fs from 'fs';
const data = fs
	.readFileSync('./2021/day08/control.txt', 'utf-8')
	.split(/\n/)
	.map((x) => x.split(' | ').map((x) => x.split(' ')));

// console.log(data);
const solution = (input) => {
	const num = {
		2: 1,
		3: 7,
		4: 4,
		7: 8
	};
	const uniqueLength = [ 2, 4, 3, 7 ];
	const result = input.map(([ input, output ]) => {
		console.log(output);
		return output.map((x) => {
			if (uniqueLength.some((y) => y === x.length)) return num[x.length];
		});
	});
	console.log(result.flat().filter((x) => x !== undefined).length);
	console.log(result);
};

solution(data);
