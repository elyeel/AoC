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
  orb == undefined ? (tree[x[0]] = x[1]) : orb.push(x[1]);
});

console.log(orbital.length, orbital, tree);
