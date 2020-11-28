const fs = require("fs");
const input = fs.readFileSync("./2015/day03/control.txt", "utf8").split("");
console.log(input.length);

const coord = {
  "0,0": 0,
};
let x = 0,
  rx = 0,
  ry = 0,
  robo = false,
  y = 0;

const printCoord = (x, y) => {
  if (!coord[`${x},${y}`]) coord[`${x},${y}`] = 0;
  coord[`${x},${y}`]++;
};

input.map((deliver) => {
  if (robo) {
    switch (deliver) {
      case "^":
        {
          ry++;
          printCoord(rx, ry);
        }
        break;
      case "<":
        {
          rx--;
          printCoord(rx, ry);
        }
        break;
      case ">":
        {
          rx++;
          printCoord(rx, ry);
        }
        break;
      case "v":
        {
          ry--;
          printCoord(rx, ry);
        }
        break;
    }
  } else {
    switch (deliver) {
      case "^":
        {
          y++;
          printCoord(x, y);
        }
        break;
      case "<":
        {
          x--;
          printCoord(x, y);
        }
        break;
      case ">":
        {
          x++;
          printCoord(x, y);
        }
        break;
      case "v":
        {
          y--;
          printCoord(x, y);
        }
        break;
    }
  }
  switch (deliver) {
    case "^":
      {
        y++;
        printCoord(x, y);
      }
      break;
    case "<":
      {
        x--;
        printCoord(x, y);
      }
      break;
    case ">":
      {
        x++;
        printCoord(x, y);
      }
      break;
    case "v":
      {
        y--;
        printCoord(x, y);
      }
      break;
  }
  robo = !robo;
});

console.log(Object.entries(coord).length);
console.log(coord);
