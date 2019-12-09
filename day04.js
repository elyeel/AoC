const part4a = () => {
  const b = 138307;
  const e = 654504;
  const mb = 138888;
  const me = 555555;

  let nofMatches = 0;

  let v = [1, 3, 8, 8, 8, 8];
  let i = v.length;
  while (v[0] !== 6 || v[1] !== 6) {
    do {
      --i;
      ++v[i];
    } while (i > 0 && v[i] > 9);
    ++i;
    while (i < v.length) {
      v[i] = v[i - 1];
      ++i;
    }

    for (let p = 1; p < v.length; ++p)
      if (v[p] === v[p - 1]) {
        ++nofMatches;
        break;
      }
  }

  // document.writeln(nofMatches);
  return nofMatches;
};

console.log(part4a());
