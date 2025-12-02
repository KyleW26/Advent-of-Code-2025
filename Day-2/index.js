import { readFile } from "fs/promises";

let array = [];
let invalidIDs = [];
const data = await readFile("./data.txt", "utf-8");
const numberRanges = data
  .split(",")
  .map((r) => r.trim().split("-").map(Number));

findInvalidIDs();
findInvalidIDsPartTwo();

async function findInvalidIDs() {
  for (const [start, end] of numberRanges) {
    for (let n = start; n <= end; n++) {
      const s = n.toString();
      const length = s.length;

      // Only strings with an even length can be a number repeated twice
      if (length % 2 !== 0) continue;

      const half = length / 2;
      const firstHalf = s.slice(0, half);
      const secondHalf = s.slice(half);

      if (firstHalf === secondHalf) {
        invalidIDs.push(n);
      }
    }
  }
  sumOfInvalidIDs(invalidIDs);
}

async function findInvalidIDsPartTwo() {
  invalidIDs = [];

  for (const [start, end] of numberRanges) {
    for (let n = start; n <= end; n++) {
      const s = n.toString();
      const length = s.length;

      // Try every possible size from 0 to half the length of the string
      let isInvalid = false;
      for (let k = 1; k <= Math.floor(length / 2); k++) {
        // Must evenly divide
        if (length % k !== 0) continue;

        const block = s.slice(0, k);
        const repeats = length / k;

        // check if repeats at least twice
        if (repeats < 2) continue;

        const rebuiltString = block.repeat(repeats);

        if (rebuiltString === s) {
          isInvalid = true;
          break;
        }
      }

      if (isInvalid) {
        invalidIDs.push(n);
      }
    }
  }
  sumOfInvalidIDs(invalidIDs);
}

function sumOfInvalidIDs(invalidList) {
  let total = 0;

  invalidList.forEach((id) => {
    total += id;
  });

  console.log(total);
  return total;
}
