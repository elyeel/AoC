import fs from 'fs';

const lines = fs.readFileSync('./2016/day07/data.txt', 'utf-8').split(/\n/);

// console.log(lines.length);
const check = (str) => {
	const regex = /\[?(\w)(\w)\2\1\]?/;
	// console.log(typeof str);
	if (str.match(regex)) {
		const [ s, c1, c2 ] = str.match(regex);
		if (c1 === c2) return false;
		if (!regex.test(str)) return false;
		else return true;
	} else return false;
};

// console.log(
// 	'lknaffpzamlkufgt[uvdgeatxkofgoyoi]ajtqcsfdarjrddrzo[bxrcozuxifgevmog]rlyfschtnrklzufjzm'.match(
// 		/\[\w+\]/g
// 	)
// ); //match or split works
// console.log(check('ajtqcsfdarjrddrzo'));
// console.log(check('[nzojrnbfrxvappppu]'));

const solution = (lines) => {
	const regex = /(\w)(\w)\2\1/g;
	const result = lines.map((line) => {
		const hypernet = line.match(/\[\w+\]/g);
		const nonHypernet = line.split(/\[\w+\]/);
		// console.log({ hypernet, nonHypernet });
		if (hypernet.some((str) => check(str.toString()))) return false;
		if (nonHypernet.some((str) => check(str))) return true;
	});
	console.log(result.filter((x) => x === true).length);
	return result;
};
solution(lines);
