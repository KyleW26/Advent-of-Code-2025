import { readFile } from "fs/promises";

let array = [];

async function main() {
  const data = await readFile("./data.txt", "utf-8");
  array = data
    .split("\n")
    .map((line) => line.replace("R", "+").replace("L", "-"))
    .map((str) => Number(str));
  calculatePartOne(array);
  calculatePartTwo(array);
}

main();

function calculatePartOne(array) {
  let sum = 50;
  let zeroCount = 0;

  array.forEach((value) => {
    sum += value;
    sum = ((sum % 100) + 100) % 100; // Keep sum within 0-99 range
    if (sum === 0) {
      zeroCount++;
    }
  });

  console.log("Number of times sum reached zero: " + zeroCount);

  return zeroCount;
}

function calculatePartTwo(array) {
  let dial = 50; // Starting position
  let passZeroCount = 0;

  array.forEach((rotation) => {
    const step = rotation > 0 ? 1 : -1; // Check whether to step to the left or right
    let remaining = Math.abs(rotation); // Check the number of clicks required

    // Loop through every click of the dial rotation
    while (remaining > 0) {
      dial += step;
      // Wrap dial around 0-99
      if (dial > 99) dial = 0;
      if (dial < 0) dial = 99;

      if (dial === 0) {
        passZeroCount++;
      }

      remaining--;
    }
  });

  console.log("Number of times the dial passed zero: " + passZeroCount);
  return passZeroCount;
}
