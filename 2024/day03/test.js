const regex = /(mul\((\d+),(\d+)\))/gm;

// Alternative syntax using RegExp constructor
// const regex = new RegExp('(mul\\((\\d+),(\\d+)\\))', 'gm')

const str = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8) mul(8,5))
xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

// Reset `lastIndex` if this regex is defined globally
// regex.lastIndex = 0;

let m;
let z = [];

while ((m = regex.exec(str)) !== null) {
  // This is necessary to avoid infinite loops with zero-width matches
  if (m.index === regex.lastIndex) {
    regex.lastIndex++;
  }

  // The result can be accessed through the `m`-variable.
  m.forEach((match, groupIndex) => {
    const result = { x, y };
    if (groupIndex === 2) {
      console.log(`Found match, group ${groupIndex}: ${match}`);
      result.x = +match;
    }
    if (groupIndex === 3) {
      console.log(`Found match, group ${groupIndex}: ${match}`);
      result.y = +match;
    }
    z.push(result);
  });
}

console.log(z);
