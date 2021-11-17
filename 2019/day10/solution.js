import fs from 'fs';

const data = fs.readFileSync('./2019/day10/data.txt', 'utf8').split('\n');
console.log(data);

const coordMap = new Map();
data.forEach((line, y) => {
	line.split('').forEach((dot, x) => {
		// const a = x + 1;
		// const b = y + 1;
		coordMap.set(`${x} ${y}`, { x, y, value: dot, detected: 0 });
	});
});

//outside, looking for '#', then using the current coordinate to find x/y in distance from current x,y
for (let [ coord, valueObj ] of coordMap.entries()) {
	if (valueObj.value === '#') {
		// inside, search
		const asteroid = new Set();
		coordMap.forEach((valObj) => {
			if (valObj.value === '#') {
				// will use degree
				if (valueObj.x !== valObj.x || valueObj.y !== valObj.y) {
					// console.log(coord);

					const dx = valObj.x - valueObj.x;
					const dy = valObj.y - valueObj.y;
					const arcTan = Math.atan2(dy, dx);
					asteroid.add(arcTan);
				} else {
				}
			}
		});
		// console.log(asteroid);
		valueObj.detected += asteroid.size;
	}
}

// console.log(coordMap.size, coordMap);
let max = { x: 0, y: 0, value: 0 };
for (const obj of coordMap.values()) {
	if (obj.detected > max.value) {
		max.x = obj.x;
		max.y = obj.y;
		max.value = obj.detected;
	}
}
console.log(max);
//part 2
