import fs from 'fs';
const data = fs
	.readFileSync('./2021/day12/control1.txt', 'utf-8')
	.trim()
	.split(/\n/)
	.map((x) => x.split('-'));
