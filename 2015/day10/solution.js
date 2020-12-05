const writeString = (str) => {
  let result = "";
  const element = str.split("");

  for (let i = 0; i < str.length; ++i) {
    let j = i + i,
      count = 0;
    while (element[j] && element[j] === element[i]) {
      count++;
      j++;
    }
    result += `${count}`;
    result += `${element[i]}`;
    i += j - i;
  }
  // str.split("").forEach((element, i) => {
  //   // console.log(element, i);
  //   let j = i,
  //     count = 1;
  //   while (element[j] && element[j] === element[i]) {
  //     count++;
  //     j++;
  //   }
  //   result += `${count}`;
  //   result += `${element}`;
  // });
  return result;
};

console.log(
  ["1", "11", "21", "1211", "111221", "312211"].map((x) => writeString(x))
);
