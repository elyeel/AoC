import fs from 'fs';
const route = fs.readFileSync('./2016/day01/data.txt', 'utf-8');
// function that returns x and y coordinates based on the route
const getTripInfo = function(route) {
	// turn route into an array
	const routeAsArray = route.split(', ');
	// used to track cardinal direction N = 0, E = 90, S = 180, W = 270
	let pointing = 0;
	// start coordinates
	let x = 0;
	let y = 0;
	// path log - sad attempt to track every position step by step
	let path = [];

	// calculates the new cardinal heading
	const getNewHeading = function(direction) {
		// reset 360 to 0 to prevent going above 360
		if (pointing === 360) pointing = 0;

		// if turning left reduce by 90, if right add 90
		if (direction === 'L') pointing -= 90;
		else pointing += 90;

		// if heading is negative add 360 to bring it back to between 0-360 always
		if (pointing < 0) pointing += 360;
	};

	// logs coordinates for a step one by one as object in array - seems way too involved but works (i think)
	const logPath = function(cOld, cNew, cConst) {
		let stepLog = {};

		// records each step - totally unnecessary but all I could think of at the time
		const addToLog = function(cOld, cConst) {
			if (pointing === 0 || pointing === 180)
				stepLog = {
					x: cOld,
					y: cConst
				};
			else
				stepLog = {
					x: cConst,
					y: cOld
				};
			// add to path
			path.push(stepLog);
		};

		// if to handle - and + coordinates for loops - also could be done better I think
		if (cOld < cNew) {
			for (let i = cOld + 1; i <= cNew; i++) {
				addToLog(i, cConst);
			}
		} else {
			for (let j = cOld - 1; j >= cNew; j--) {
				addToLog(j, cConst);
			}
		}
	};

	// performs a turn based on one step of the route
	const turn = function(step) {
		// distance to travel along the grid: number portion of the step turned to int
		const distance = parseInt(step.substring(1, step.length));
		// turn direction (L or R)
		const direction = step.substring(0, 1);
		// start of turn position
		const startPos = {
			x: x,
			y: y
		};

		// switch based on current cardinal direction - this could probably be done better?
		// if you turn left pointing south or east you add distance to x and y respectively
		// if you turn right you subtract
		// if you turn left pointing north or west you subtract distance to x and y respectively
		// if you turn right you add
		// added log path to track route path by coordinates
		switch (pointing) {
			case 90:
				direction === 'L' ? (y += distance) : (y -= distance);
				logPath(startPos.y, y, x);
				break;
			case 180:
				direction === 'L' ? (x += distance) : (x -= distance);
				logPath(startPos.x, x, y);
				break;
			case 270:
				direction === 'L' ? (y -= distance) : (y += distance);
				logPath(startPos.y, y, x);
				break;
			default:
				direction === 'L' ? (x -= distance) : (x += distance);
				logPath(startPos.x, x, y);
				break;
		}

		// get new cardinal heading after calculating new coordinates
		getNewHeading(direction);
	};

	// make turns for each step in the route
	routeAsArray.forEach(function(step) {
		turn(step);
	});

	// return object with x and y properties of the destination coordinates
	return {
		dest: {
			x: x,
			y: y
		},
		path: path
	};
};

// calculates the distance between start (0,0) and end destination obj with x and y properties
const calcDistance = function(dest) {
	return Math.abs(dest.x) + Math.abs(dest.y);
};

// supposed to return the first x and y visited twice but I can't seem to make it work.
const findFirstReVisit = function(path) {
	// using ES6 Sets
	let visited = new Set();
	// double loop adds key then check if the key is already there in the second looop
	for (let i = 0; i < path.length - 1; i++) {
		const key = `${path[i].x},${path[i].y}`;
		if (visited.has(key)) {
			return {
				x: path[i].x,
				y: path[i].y
			};
		} else {
			visited.add(key);
		}
	}
};

// get final destination coordinates and calculate the distance
console.log('Distance to End of Route ', calcDistance(getTripInfo(route).dest));

// get first point of revisit
console.log(
	'Distance to First Point Traversed Twice ',
	calcDistance(findFirstReVisit(getTripInfo(route).path))
);
