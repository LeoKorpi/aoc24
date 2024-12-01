const fs = require("node:fs");
let data = "";

// import data from local file
try {
  data = fs.readFileSync("./day1/input.txt", "utf-8");
} catch (err) {
  console.log("Error:" + err);
}

// remove all spaces and breaklines, split into array of numbers
let dataArray = data.replace(/\s+/g, " ").match(/\d+/g);

// sort both arrays in ascending order
let leftList = dataArray
  .filter((_, index) => index % 2 === 0)
  .sort((a, b) => a - b);
let rightList = dataArray
  .filter((_, index) => index % 2 === 1)
  .sort((a, b) => a - b);

// calculate the total distance between all IDs
let totalDistance = 0;
for (let i = 0; i < leftList.length; i++) {
  totalDistance += Math.abs(rightList[i] - leftList[i]);
}

// see which values appear in both lists and how many times
let frequencyMap = rightList.reduce((map, num) => {
  map[num] = (map[num] || 0) + 1;
  return map;
}, {});

// calculate the similarity score
let similarityScore = leftList.reduce((score, num) => {
  if (frequencyMap[num]) {
    score += num * frequencyMap[num];
  }
  return score;
}, 0);
