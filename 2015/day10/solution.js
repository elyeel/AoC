const writeString = (str) => {
  let result = "";
  str.split("").forEach((element, i) => {
    // console.log(element, i);
    let j = i,
      count = 1;
    while (element[j] && element[j] === element[i]) {
      count++;
      j++;
    }
    result += `${count}`;
    result += `${element}`;
  });
  return result
};

console.log(writeString("1"));
