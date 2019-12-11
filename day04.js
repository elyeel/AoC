const input = "138307-654504".split("-");
const inputArr = [];
const regEx = /([0-9])\1/;
const regEx2 = /([0-9])\1\1/;
for (let i = parseInt(input[0]); i <= parseInt(input[1]); i++) {
	inputArr.push(i);
}
const duplArr = inputArr.filter(x => regEx.test(x));
const noDesc = duplArr.filter(elem => {
	const chars = elem.toString(10).split("");
	let test = chars[0];
	for (let i = 1; i < 6; i++) {
		if (parseInt(test, 10) <= parseInt(chars[i], 10)) {
			test = chars[i];
		} else {
			return false;
		}
	}
	return true;
});

const noTriple = noDesc.filter(elem => !regEx2.test(elem));
const part2 = () => {};

console.log("Part 1 :", noDesc.length);
console.log("Part 2 :", noTriple.length); // still working on this part2
