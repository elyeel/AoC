// const input = '853192647'; // your puzzle input
const input = '389125467'; // sample input

const solution = (input, turn = 10, p = 1) => {
	let cups = input.split('').map((x) => +x);
	// console.log(cups);

	for (let i = 0; i < turn; i++) {
		let currentCup = cups.shift();
		let pickUpCups = cups.slice(0, 3);
		let leftCups = cups.slice(3);
		// console.log({ currentCup, pickUpCups, leftCups });

		let highestCup = p === 1 ? Math.max(...leftCups) : 1000000;
		let destinationCup;
		let found = false;
		let targetFromLeftCupsIdx = leftCups.indexOf(currentCup - 1);
		if (targetFromLeftCupsIdx >= 0) {
			destinationCup = leftCups[targetFromLeftCupsIdx];
			cups = leftCups
				.splice(0, targetFromLeftCupsIdx + 1)
				.concat(pickUpCups)
				.concat(leftCups);
			// pickUpCups.unshift(destinationCup[0]);
			// cups = pickUpCups.concat(leftCups);
			cups.push(currentCup);
			// console.log({ cups, leftCups, currentCup, destinationCup, iter: i + 1 });
		} else {
			let value = currentCup - 1;
			while (value > 0 && found === false) {
				targetFromLeftCupsIdx = leftCups.indexOf(value);
				if (targetFromLeftCupsIdx >= 0) {
					found = true;
				} else {
					value--;
				}
			}
			if (found === false) {
				if (p === 1) {
					highestCup = Math.max(...leftCups);
					targetFromLeftCupsIdx = leftCups.indexOf(highestCup);
					cups = leftCups
						.splice(0, targetFromLeftCupsIdx + 1)
						.concat(pickUpCups)
						.concat(leftCups);
					// cups.concat(pickUpCups);
					// cups.concat(leftCups);
					cups.push(currentCup);
					// console.log({ i: i + 1, cups, leftCups, currentCup, destinationCup });
				} else {
				}
			} else {
				destinationCup = leftCups[targetFromLeftCupsIdx];
				cups = leftCups
					.splice(0, targetFromLeftCupsIdx + 1)
					.concat(pickUpCups)
					.concat(leftCups);
				// pickUpCups.unshift(destinationCup[0]);
				// cups = pickUpCups.concat(leftCups);
				cups.push(currentCup);
				// console.log({
				// 	pickUpCups,
				// 	destinationCup,
				// 	cups,
				// 	leftCups,
				// 	currentCup,
				// 	i: i + 1
				// });
			}
		}
	}
	return cups;
};

console.log(solution(input, 100));
