import fs from 'fs';
let data = fs
	.readFileSync('./2021/day13/control.txt', 'utf-8')
	.trim()
	.split(/\n\n/);
// .map((x, i) => {
// 	if (i === 0) return x.split(',').map((y) => +y);
// 	else
// 		return x
// 			.trim()
// 			.split(/\n/)
// 			.map((y) => y.split(/\s+/).filter((z) => z !== '').map((r) => +r));
// });
let [ dotCoord, fold ] = data;
dotCoord = dotCoord.split(/\n/).map((x) => x.split(',').map((x) => +x));
fold = fold.split(/\n/).map((x) => {
	const [ r, axis, value ] = x.match(/fold along (y|x)=(\d+)/);
	return { axis, value: +value };
});
// console.log(dotCoord, fold);
