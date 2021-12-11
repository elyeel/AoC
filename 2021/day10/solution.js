import fs from 'fs';
const data = fs
	.readFileSync('./2021/day10/control.txt', 'utf-8')
	.trim()
	.split(/\n/)
	.map((x) => x.split(''));

console.log(data);

const test = (line) => {
	const syntax = {
		'[': 0,
		'(': 0,
		'{': 0,
		'<': 0,
		']': 0,
		')': 0,
		'}': 0,
		'>': 0
	};
	line.forEach((e) => {
		if (e === '{' || e === '(' || e === '[' || e === '<') {
			syntax[e]++;
		} else {
			syntax[e]--;
			// if (e === ')') syntax['(']--;
			// if (e === '}') syntax['{']--;
			// if (e === ']') syntax['[']--;
			// if (e === '>') syntax['<']--;
		}
	});
	console.log(syntax);
};

data.forEach((x) => test(x));
