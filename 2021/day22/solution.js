import fs from 'fs';
const regex = /(on|off) x=(-\d+|\d+)..(-\d+|\d+),y=(-\d+|\d+)..(-\d+|\d+),z=(-\d+|\d+)..(-\d+|\d+)/;
const steps = fs
	.readFileSync('./2021/day22/control3.txt', 'utf-8')
	.split(/\n/)
	.map((x) => {
		const [ line, state, xMin, xMax, yMin, yMax, zMin, zMax ] = x.match(regex);
		return {
			state,
			xMin: +xMin,
			xMax: +xMax,
			yMin: +yMin,
			yMax: +yMax,
			zMin: +zMin,
			zMax: +zMax
		};
	});
// console.log(steps);

const solution = (steps, p = 1) => {
	// initialize limit
	const limit =
		p === 1
			? { bottom: -50, upper: 50 }
			: { bottom: -Infinity, upper: Infinity };
	let count = 0;

	const reactor = new Map();
	steps.forEach((step) => {
		if (
			p === 1 &&
			step.xMin >= limit.bottom &&
			step.xMax <= limit.upper &&
			step.yMin >= limit.bottom &&
			step.yMax <= limit.upper &&
			step.zMin >= limit.bottom &&
			step.zMax <= limit.upper
		) {
			for (let x = step.xMin; x <= step.xMax; x++) {
				for (let y = step.yMin; y <= step.yMax; y++) {
					for (let z = step.zMin; z <= step.zMax; z++) {
						reactor.set(`${x},${y},${z}`, step.state);
					}
				}
			}
		}
	});
	// console.log(reactor, reactor.size);

	for (const cube of reactor.values()) {
		if (cube === 'on') count++;
	}
	console.log(count);

	// test of overlapping
	// const reactor2 = { xBott: null, xUpp: null, yBott: null, yUpp: null, zBott: null, zMax: null }
	let num = 1;
	if (p === 2) {
		steps.forEach((step) => {
			if (reactor.size < 1) {
				reactor.set(`r${num}`, {
					xMin: step.xMin,
					xMax: step.xMax,
					yMin: step.yMin,
					yMax: step.yMax,
					zMin: step.zMin,
					zMax: step.zMax,
					state: step.state
				});
				num++;
			} else {
				for (const [ key, value ] of reactor) {
					if (
						// overlapped
						value.xMin <= step.xMin ||
						value.xMax >= step.xMax ||
						value.yMin <= step.yMin ||
						value.yMax >= step.yMax ||
						value.zMin <= step.zMin ||
						value.zMax >= step.zMax
					) {
						if (value.state === step.state) {
							if (step.xMax >= value.xMax) value.xMax = step.xMax;
							if (step.xMin <= value.xMin) value.xMin = step.xMin;
							if (step.yMax >= value.yMax) value.yMax = step.yMax;
							if (step.yMin <= value.yMin) value.yMin = step.yMin;
							if (step.zMax >= value.zMax) value.zMax = step.zMax;
							if (step.zMin <= value.zMin) value.zMin = step.zMin;
						} else {
							// different value but overlapped
							// step.x
						}
					} else {
						// not overlapped
					}
				}
			}
		});
	}
};
solution(steps);
