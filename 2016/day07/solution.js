import fs from 'fs';

const lines = fs.readFileSync('./2016/day07/data.txt', 'utf-8').split(/\n/);

// console.log(lines.length);
const check = (str, regex) => {
	// console.log(typeof str);
	if (str.match(regex)) {
		const [ s, c1, c2 ] = str.match(regex);
		if (c1 === c2) return false;
		return regex.test(str);
		// if (!regex.test(str)) return false;
		// else return true;
	} else return false;
};

const regexABBA = /\[?(\w)(\w)\2\1\]?/;
const regexABA = /\[?(\w)(\w)\1\]?/;

const checkABA = (str) => {
	const abaArr = [];
	for (let i = 0; i < str.length - 2; i++) {
		const element = str.slice(i, i + 3);
		if (regexABA.test(element)) abaArr.push(element);
	}
	return abaArr;
};

// console.log(
// 	'lknaffpzamlkufgt[uvdgeatxkofgoyoi]ajtqcsfdarjrddrzo[bxrcozuxifgevmog]rlyfschtnrklzufjzm'.match(
// 		/\[\w+\]/g
// 	)
// ); //match or split works
// console.log(check('ajtqcsfdarjrddrzo'));
// console.log(check('[nzojrnbfrxvappppu]'));

checkABA('nniczueulxtdsmkniex');

const solution = (lines, part = 1) => {
	if (part === 1) {
		const result = lines.map((line) => {
			const hypernet = line.match(/\[\w+\]/g);
			const nonHypernet = line.split(/\[\w+\]/);
			// console.log({ hypernet, nonHypernet });
			if (hypernet.some((str) => check(str, regexABBA))) return false;
			if (nonHypernet.some((str) => check(str, regexABBA))) return true;
		});
		console.log(result.filter((x) => x === true).length);
		return result;
	} else {
		const result = lines.map((line) => {
			const res = [];
			const hypernet = line.match(/\[\w+\]/g).map((x) => checkABA(x)).flat();
			const nonHypernet = line.split(/\[\w+\]/).map((x) => checkABA(x)).flat();
			// console.log({ hypernet, nonHypernet });
			hypernet.forEach((elem) => {
				const test = nonHypernet.some(
					(x) => x[1] === elem[0] && x[0] === elem[1]
				);
				if (test) res.push(test);
			});
			return res;
		});
		console.log(result.filter((x) => x[0] === true).length);
	}
};
solution(lines, 2);
