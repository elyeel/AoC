import fs from 'fs';
let data = fs
	.readFileSync('./2021/day04/control.txt', 'utf-8')
	.trim()
	.split(/\n\n/)
	.map((x, i) => {
		if (i === 0) return x.split(',').map((y) => +y);
		else
			return x
				.trim()
				.split(/\n/)
				.map((y) => y.split(/\s+/).filter((z) => z !== '').map((r) => +r));
	});
const bingoDraw = data.shift();
const boards = [];
data.forEach((board) => {
	// console.log(board);
	const tempBoard = [];
	for (let y = 0; y < board.length; y++) {
		tempBoard.push(board[y]);
		const vertical = [];
		// vertical.push(board[y]);
		for (let x = 0; x < board[y].length; x++) {
			const element = board[x][y];
			vertical.push(element);
		}
		tempBoard.push(vertical);
	}

	boards.push(tempBoard);
});

// console.log(boards);
const solution = (boards, bingoDraw, p = 1) => {
	const draw = bingoDraw.slice(0, 5);
	// console.log(draw);
	let won = false;
	const part2 = [];

	for (let i = 5; i < bingoDraw.length; i++) {
		//i is bingo draw #
		const currentDraw = bingoDraw[i];
		draw.push(currentDraw);

		for (let j = 0; j < boards.length; j++) {
			//j is board#
			const board = boards[j];
			let win = false;
			let winLine;
			for (let k = 0; k < board.length; k++) {
				const line = board[k];
				if (line.every((x) => draw.some((y) => y === x))) {
					win = true;
					winLine = line;
					if (p === 1) break;
				}
			}
			if (win) {
				won = true;
				// get all unmarked board numbers
				const unMarkedNum = data[j]
					.flat()
					.filter((num) => !draw.includes(num))
					.reduce((a, c) => a + c, 0);
				if (p === 1) return unMarkedNum * currentDraw;

				console.log(currentDraw);
				part2.push(unMarkedNum * currentDraw);
				// console.log(currentDraw, draw, unMarkedNum);

				// break;
			}
		}
		// return part2;
		// if (won) {
		// 	break;
		// }
	}
	return part2;
};

console.log(solution(boards, bingoDraw, 2));
