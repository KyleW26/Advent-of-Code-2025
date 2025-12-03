import { readFile } from "fs/promises";

let array = [];
const data = await readFile("./data.txt", "utf-8");
let finalValue = 0;

getJoltagePartOne(data);
getJoltagePartTwo(data);

function getJoltagePartOne(data) {
  let splitData = data.split("\n");

  splitData.forEach((line) => {
    let characters = line.split("").map(Number);

    const k = 2; // number of digits to pick from my array
    const max2 = pickLargestKDigits(characters, k);

    // join digits to make a number
    const num = Number(max2.join(""));

    finalValue += num;
    console.log("Current final value: " + finalValue);
  });
}

function getJoltagePartTwo(data) {
  let splitData = data.split("\n");
  let finalValue = 0;

  splitData.forEach((line) => {
    let characters = line.split("").map(Number);

    const k = 12; // number of digits to pick from my array
    const max12 = pickLargestKDigits(characters, k);

    // join digits to make a number
    const num = Number(max12.join(""));

    finalValue += num;
    console.log("Current final value: " + finalValue);
  });
}

function pickLargestKDigits(arr, k) {
  const stack = [];
  let toRemove = arr.length - k;

  for (let digit of arr) {
    while (toRemove > 0 && stack.length && stack[stack.length - 1] < digit) {
      stack.pop();
      toRemove--;
    }
    stack.push(digit);
  }

  // If not enough digits removed, cut from the end
  return stack.slice(0, k);
}
