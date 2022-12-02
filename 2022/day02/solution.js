import fs from "fs";
const input = fs
  .readFileSync("./2022/day02/control.txt", "utf-8")
  .split("\n")
  .map((x) => x.split(""));
