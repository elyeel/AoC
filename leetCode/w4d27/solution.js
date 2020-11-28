var addTwoNumbers = function (l1 = [2,4,3], l2 = [5,6,4]) {
  const num1 = parseInt(l1.reverse().join(""), 10);
  const num2 = parseInt(l2.reverse().join(""), 10);
  const result = num1 + num2;
  return result.split("").reverse();
};
console.log(addTwoNumbers())