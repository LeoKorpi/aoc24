const fs = require("node:fs");
let data = "";

try {
  data = fs.readFileSync("./day1/input.txt", "utf-8");
} catch (err) {
  console.log("Error:" + err);
}

let dataArray = data.replace(/\s+/g, " ").match(/\d+/g);
// dataArray = dataArray.replace("\n", "");

let leftList = dataArray
  .filter((_, index) => index % 2 === 0)
  .sort((a, b) => a - b);
let rightList = dataArray
  .filter((_, index) => index % 2 === 1)
  .sort((a, b) => a - b);

let totalDistance = 0;

for (let i = 0; i < leftList.length; i++) {
  totalDistance += Math.abs(rightList[i] - leftList[i]);
}

let frequencyMap = rightList.reduce((map, num) => {
  map[num] = (map[num] || 0) + 1;
  return map;
}, {});

let similarityScore = leftList.reduce((score, num) => {
  if (frequencyMap[num]) {
    score += num * frequencyMap[num];
  }
  return score;
}, 0);

console.log("similarityScore: " + similarityScore);
