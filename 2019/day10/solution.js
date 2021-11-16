import fs from 'fs';

const data = fs.readFileSync('./2019/day10/control2.txt', 'utf8').split('\n');
console.log(data);

const coordMap = new Map();
data.forEach((line, y) => {
	line
		.split('')
		.forEach((dot, x) =>
			coordMap.set(`${x} ${y}`, { x, y, value: dot, detected: 0 })
		);
});

//outside, looking for '#', then using the current coordinate to find x/y in distance from current x,y
for (let [ coord, valueObj ] of coordMap.entries()) {
	if (valueObj.value === '#') {
		// inside, search
		const asteroid = new Set();
		coordMap.forEach((valObj) => {
			if (valObj.value === '#') {
				if (valueObj.x === valObj.x && valueObj.y === valObj.y) {
				} else {
					const x = valObj.x - valueObj.x;
					const y = valObj.y - valueObj.y;
					asteroid.add(x / y);
					console.log(valueObj.x, '-', valueObj.y, '=>', `${x}/${y}`);
				}
			}
		});
		valueObj.detected += asteroid.size;
	}
}

console.log(coordMap.size, coordMap);
