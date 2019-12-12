const fs = require("fs");
const input = fs.readFileSync("./texts/example06.txt", "utf8").split("\n");
const orbital = [];
const tree = {};

const plot = input.map(node => {
  // Plot the orbital orbits
  orbital.push(node.split(")"));
});

const plotted = orbital.map(x => {
  let orb = tree[x[0]];
  if (orb == undefined) {
    tree[x[0]] = x[1];
  } else {
    tree[x[0]] = [];
    tree[x[0]].push(x[1]);
    tree[x[0]].push(orb);
  }
});

console.log(orbital.length, orbital, tree);
