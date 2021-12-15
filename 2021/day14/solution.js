import fs from 'fs';
let [ template, rulesPair ] = fs
	.readFileSync('./2021/day14/data.txt', 'utf-8')
	.trim()
	.split(/\n\n/);
const rules = {};
rulesPair.split(/\n/).map((x) => {
	const [ pair, insert ] = x.split(' -> ');
	rules[pair] = insert;
});

// console.log(rules);
const solution = (template, rules, step = 1) => {
	// iterate steps
	let result = template;
	const charMap = {};
	for (let i = 0; i < step; i++) {
		let temp = '';
		for (let j = 0; j < result.length - 1; j++) {
			const first = result[j];
			const second = result[j + 1];
			const insertion = rules[first + second];
			// console.log(first, second, insertion);
			temp += first + insertion;
		}
		result = temp + result[result.length - 1];
	}
	// for (let i = 0; i < result.length; i++) {
	// 	const char = result[i];
	// 	charMap[char] ? charMap[char]++ : (charMap[char] = 1);
	// }
	console.log(result);
};
// console.log(solution(template, rules, 20)); // 20 times -> feasible, 30 times -> memory heap error

const solution2 = (template, rules, step = 1) => {
	// create templatePairs from template, store how many pairs are there per pair
	let templatePairs = {};
	for (let i = 0; i < template.length - 1; i++) {
		const pair = template.slice(i, i + 2);
		templatePairs[pair] ? templatePairs[pair]++ : (templatePairs[pair] = 1);
	}

	for (let i = 0; i < step; i++) {
		let nextPairsCount = {};
		for (const pair in templatePairs) {
			const child = templatePairs[pair];
			const firstPair = pair[0] + rules[pair];
			const secondPair = rules[pair] + pair[1];
			nextPairsCount[firstPair]
				? (nextPairsCount[firstPair] += child)
				: (nextPairsCount[firstPair] = child);

			nextPairsCount[secondPair]
				? (nextPairsCount[secondPair] += child)
				: (nextPairsCount[secondPair] = child);
		}

		templatePairs = nextPairsCount;
	}
	console.log(templatePairs);
	// count chars
	const charCount = {
		[template[0]]: 1
	};
	for (const pair in templatePairs) {
		if (Object.hasOwnProperty.call(templatePairs, pair)) {
			// only use the second chars in pair to not double counting every char
			// charCount[pair[0]]
			// 	? (charCount[pair[0]] += templatePairs[pair])
			// 	: (charCount[pair[0]] = templatePairs[pair]);
			charCount[pair[1]]
				? (charCount[pair[1]] += templatePairs[pair])
				: (charCount[pair[1]] = templatePairs[pair]);
		}
	}
	console.log(charCount, Object.values(charCount));
	return (
		Math.max(...Object.values(charCount)) -
		Math.min(...Object.values(charCount))
	);

	// // split template into pairs of 2
	// let templatePairs = {};
	// for (let i = 0; i < template.length - 1; i++) {
	// 	const element = template.slice(i, i + 2);
	// 	templatePairs[element]
	// 		? templatePairs[element]++
	// 		: (templatePairs[element] = 1);
	// }
	// console.log({ templatePairs });

	// // next pairs should also tell how many nextpairs
	// let pairsCount = {};
	// let nextPairs = {};
	// for (const pair in templatePairs) {
	// 	const first = pair[0] + rules[pair];
	// 	const second = rules[pair] + pair[1];
	// 	nextPairs[pair] = [ first, second ];
	// }
	// console.log({ nextPairs });

	// for (let i = 0; i < step; i++) {
	// 	for (const pair in nextPairs) {
	// 		for (const nextPair of nextPairs[pair]) {
	// 			console.log({ pair, nextPair });
	// 			pairsCount[nextPair]
	// 				? pairsCount[nextPair]++
	// 				: (pairsCount[nextPair] = 1);
	// 		}
	// 	}
	// 	console.log({ i, pairsCount });
	// 	templatePairs = pairsCount;
	// }

	// const charCount = { [template[0]]: 1 };
	// // charCount[template[0]] = 1
	// for (const pair in templatePairs) {
	// 	const count = templatePairs[pair];
	// 	charCount[pair[1]]
	// 		? (charCount[pair[1]] += count)
	// 		: (charCount[pair[1]] = count);
	// }
	// console.log({ charCount });
};
console.log(solution2(template, rules, 10));
console.log(solution2(template, rules, 40));
