const fs = require("fs");
const input = fs.readFileSync("./2020/day12/data.txt", "utf8").split("\n");
// .map((x) => parseInt(x));
console.log(input.length);
const regex = /(\w)(\d+)/;

const nextDir = (currDir, LR, degree) => {
  let direction = "";
  if (degree === 180) {
    switch (currDir) {
      case "E":
        direction = "W";
        break;
      case "W":
        direction = "E";
        break;
      case "N":
        direction = "S";
        break;
      case "S":
        direction = "N";
        break;
      default:
        console.log("Wrong direction!");
    }
  } else {
    if ((LR === "L" && degree === 90) || (LR === "R" && degree === 270)) {
      switch (currDir) {
        case "E":
          direction = "N";
          break;
        case "N":
          direction = "W";
          break;
        case "W":
          direction = "S";
          break;
        case "S":
          direction = "E";
          break;
        default:
          console.log("Wrong left turn");
      }
    }
    if ((LR === "R" && degree === 90) || (LR === "L" && degree === 270)) {
      switch (currDir) {
        case "E":
          direction = "S";
          break;
        case "S":
          direction = "W";
          break;
        case "W":
          direction = "N";
          break;
        case "N":
          direction = "E";
          break;
        default:
          console.log("Wrong right turn");
      }
    }
  }
  return direction;
};

const moveShip = (lines) => {
  let ship = {
    x: 0,
    y: 0,
    waypointX: 10,
    waypointY: 1,
    dir: "E",
  };

  lines.forEach((line) => {
    const lineDir = line.match(regex);
    const direction = {
      goTo: lineDir[1],
      dist: +lineDir[2],
    };
    // console.log(direction);
    if (direction.goTo === "N") ship.y += direction.dist;
    if (direction.goTo === "S") ship.y -= direction.dist;
    if (direction.goTo === "E") ship.x += direction.dist;
    if (direction.goTo === "W") ship.x -= direction.dist;
    if (direction.goTo === "L" || direction.goTo === "R")
      ship.dir = nextDir(ship.dir, direction.goTo, direction.dist);
    if (direction.goTo === "F") {
      switch (ship.dir) {
        case "E":
          ship.x += direction.dist;
          break;
        case "W":
          ship.x -= direction.dist;
          break;
        case "N":
          ship.y += direction.dist;
          break;
        case "S":
          ship.y -= direction.dist;
          break;
        default:
          console.log("Wrong forward motion");
      }
    }
  });
  return ship;
};

const shipNow = moveShip(input);
const result = Math.abs(shipNow.x) + Math.abs(shipNow.y);

console.log(result, shipNow);

//Part 2
let ship = {
  x: 0,
  y: 0,
  waypointX: 10,
  waypointY: 1,
};

const nextDirWaypoints = (lr, degree) => {
  if (degree === 180) {
    ship.waypointX = -ship.waypointX;
    ship.waypointY = -ship.waypointY;
  } else {
    const { waypointX, waypointY } = ship;
    if ((lr === "L" && degree === 90) || (lr === "R" && degree === 270)) {
      ship.waypointX = -waypointY;
      ship.waypointY = waypointX;
    } else {
      ship.waypointX = waypointY;
      ship.waypointY = -waypointX;
    }
  }
};

// nextDirWaypoints("R", 90)
// console.log(ship)

const moveShipWaypoint = (lines) => {
  lines.forEach((line) => {
    const lineDir = line.match(regex);
    const direction = {
      goTo: lineDir[1],
      dist: +lineDir[2],
    };
    // console.log(direction);
    if (direction.goTo === "N") ship.waypointY += direction.dist;
    if (direction.goTo === "S") ship.waypointY -= direction.dist;
    if (direction.goTo === "E") ship.waypointX += direction.dist;
    if (direction.goTo === "W") ship.waypointX -= direction.dist;
    if (direction.goTo === "L" || direction.goTo === "R")
      nextDirWaypoints(direction.goTo, direction.dist);
    if (direction.goTo === "F") {
      ship.x += ship.waypointX * direction.dist;
      ship.y += ship.waypointY * direction.dist;
    }
  });
};
moveShipWaypoint(input);
console.log(Math.abs(ship.x) + Math.abs(ship.y));

