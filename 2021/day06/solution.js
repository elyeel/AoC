import fs from 'fs';
const input = fs
	.readFileSync('./2021/day06/data.txt', 'utf-8')
	.split(',')
	.map((x) => +x);

const solution = (input, days) => {
	input = input.map((x) => x - 1);
	for (let i = 1; i < days; ++i) {
		const newFish = input.filter((x) => x === 0).length;
		// console.log(newFish);
		input = input.map((x) => (x === 0 ? 7 : x)).map((x) => x - 1);
		for (let j = 0; j < newFish; ++j) {
			input.push(8);
		}
		// console.log(i, input);
	}
	return input.length;
};

// need to modify solution to not using array representantion as it used up memory stack too much as it reach over 80 iteration
// trying with a queue, cycle thru each step in lanternfish lifecycle
const solution2 = (input, days) => {
	const queue = new Array(9).fill(0);
	// fill queue with data
	input.forEach((fish) => {
		queue[fish]++;
	});
	// console.log(queue);
	for (let i = 0; i < days; i++) {
		const firstFishGroup = queue.shift();
		queue.push(firstFishGroup);
		queue[6] += firstFishGroup;
	}
	return queue.reduce((a, c) => a + c, 0);
};
console.log(solution(input, 80));
console.log(solution2(input, 80));
console.log(`Fishes after 256 days`, solution2(input, 256));
