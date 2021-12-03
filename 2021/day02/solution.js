import fs from 'fs';
const input = fs
	.readFileSync('./2021/day02/data.txt', 'utf-8')
	.split('\n')
	.map((x) => {
		const [ move, value ] = x.split(' ');
		return { move, value: +value };
	});

console.log(input);

const solution = (input, p = 1) => {
	const coord = { x: 0, depth: 0, aim: 0 };
	if (p === 1) {
		input.forEach((element) => {
			if (element.move === 'forward') coord.x += element.value;
			if (element.move === 'up') coord.depth -= element.value;
			if (element.move === 'down') coord.depth += element.value;
		});
	} else {
		input.forEach((sub) => {
			if (sub.move === 'down') coord.aim += sub.value;
			if (sub.move === 'up') coord.aim -= sub.value;
			if (sub.move === 'forward') {
				coord.x += sub.value;
				coord.depth += coord.aim * sub.value;
			}
		});
	}
	return coord.x * coord.depth;
};

console.log(solution(input, 2));
