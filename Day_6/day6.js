const data = require("fs").readFileSync("./inputs/day6_input.txt", {
  encoding: "utf-8",
});

let splitLines = data.split("\r\n");

let timeData = splitLines[0]
  .split(":")[1]
  .split(" ")
  .map((item) => {
    return item.trim();
  })
  .filter((value) => value != "");

let distanceData = splitLines[1]
  .split(":")[1]
  .split("  ")
  .filter((value) => value != "");

let res = [];

for (let i = 0; i < timeData.length; i++) {
  let maxDist = distanceData[i];
  let maxTime = timeData[i];
  let maxWins = 0;

  for (let j = 0; j < maxTime; j++) {
    if (j * (maxTime - j) > maxDist) {
      maxWins++;
    }
  }

  if (maxWins > 0) {
    res.push(maxWins);
  }
}

console.log(
  res.reduce((a, b) => {
    return a * b;
  })
);
