const fs = require("fs");
const input = fs.readFileSync("./2015/day14/data.txt", "utf8").split("\n");
console.log(input.length);

const regex = /(?<Name>\w+) can fly (?<Speed>\d+) km\/s for (?<Duration>\d+) seconds, but then must rest for (?<Rest>\d+) seconds./;

const speedVarArr = input.map((x) => {
  const speedVar = x.match(regex);
  return {
    Name: speedVar[1],
    Speed: +speedVar[2],
    Duration: +speedVar[3],
    Rest: +speedVar[4],
  };
});

console.log(speedVarArr);

const distanceTravelled = (obj, time) => {
  const cycle = Math.floor(time / (obj.Duration + obj.Rest));
  const remaining = time % (obj.Duration + obj.Rest);
  let extraDistance = 0;

  if (remaining - obj.Duration >= 0) {
    // remaining 100, dur 10, rest 100
    extraDistance += obj.Duration * obj.Speed;
  } else {
    if (remaining >= obj.Duration) {
      extraDistance += (remaining - obj.Duration) * obj.Speed;
    } else {
      extraDistance += remaining * obj.Speed;
    }
  }

  return {
    Name: obj.Name,
    Distance: cycle * obj.Duration * obj.Speed + extraDistance,
  };
};

const calculateDistance = (time) => {
  const result = speedVarArr.map((arr) => {
    return distanceTravelled(arr, time);
  });
  result.sort((a, b) => a.Distance - b.Distance);
  return result;
};

console.log(calculateDistance(2503));

// return status of each second
// const status = (obj, sec) => {

//   if (sec - obj.Duration - obj.Rest >= 0) {
//     distanceTravelled(obj, sec)
//   }
// }

const calculatePoints = (second) => {
  const result = {};
  //initialize result object
  speedVarArr.map((elem) => {
    result[elem.Name] = 0;
  });

  for (i = 1; i <= second; ++i) {
    const pointsForEachSec = calculateDistance(i);
    const max = pointsForEachSec[pointsForEachSec.length - 1].Distance;
    // console.log(pointsForEachSec, max);
    pointsForEachSec
      .filter((elem) => elem.Distance === max)
      .map((elem) => result[elem.Name]++);
  }

  return result;
};

console.log(calculatePoints(2503));
