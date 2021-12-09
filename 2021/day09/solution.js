import fs from 'fs';
const data = fs
	.readFileSync('./2021/day09/control.txt', 'utf-8')
	.split(/\n/)
	.map((x) => x.split('').map(Number));

console.log(data);
