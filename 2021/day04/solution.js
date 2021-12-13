import fs from 'fs';
let data = fs
	.readFileSync('./2021/day04/data.txt', 'utf-8')
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
//create a new board of lines (5) and columns (5) from board
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
const emptyBoard = new Array(10).fill([ -1, -1, -1, -1, -1 ]);

// console.log(boards);
const solution = (boards, bingoDraw, p = 1) => {
	const draw = bingoDraw.slice(0, 5);
	const part2 = [];

	for (let i = 5; i < bingoDraw.length; i++) {
		//i is bingo draw #
		const currentDraw = bingoDraw[i];
		draw.push(currentDraw);
		// console.log(draw.length);
		let won = false;

		for (let j = 0; j < boards.length; j++) {
			//j is board#
			const board = boards[j];
			let win = false;
			let winLine; // unused
			for (let k = 0; k < board.length; k++) {
				const line = board[k];
				if (line.every((x) => draw.some((y) => y === x))) {
					win = true;
					winLine = line;
					boards[j] = emptyBoard; // marked this board as won and never be part of draw anymore
					break;
					// if (p === 1) break;
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

				part2.push(unMarkedNum * currentDraw);
				// console.log({ i, draw, currentDraw, j, winLine }); **uncomment this line to virtually see the draws
			}
		}
	}
	return part2;
};

console.log(solution(boards, bingoDraw, 2));
