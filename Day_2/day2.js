// Expected GameSum = 2617
// Expected MinimumPowerGameSum = 59795

var fs = require("fs");

// Helper variables
const redCubes = 12;
const greenCubes = 13;
const blueCubes = 14;

// Read the data from the text file
let readData = () => {
  return new Promise((res, rej) => {
    let data = "";
    const readStream = fs.createReadStream("./inputs/day2_input.txt", "utf-8");

    readStream
      .on("data", function (line) {
        data += line;
      })
      .on("end", () => {
        res(data);
      })
      .on("error", (error) => {
        rej(error);
      });
  });
};

function parseGameData(games) {
  let gameData = [];

  games.forEach((game) => {
    let res = {};
    res.game = game.slice(game.indexOf(" ") + 1, game.indexOf(":"));
    res.splitSamples = game
      .slice(game.indexOf(":") + 2, game.length)
      .split(";");

    let largestRedcount = 0;
    let largestBlueCount = 0;
    let largestGreenCount = 0;

    res.splitSamples.forEach((sample) => {
      let str = sample.replace(/\s/g, "");

      let splitStr = str.split(",");
      splitStr.forEach((item) => {
        if (item.includes("red")) {
          let redCount = parseInt(item.slice(0, item.indexOf("red")));
          largestRedcount =
            redCount > largestRedcount ? redCount : largestRedcount;
        }
        if (item.includes("green")) {
          let greenCount = parseInt(item.slice(0, item.indexOf("green")));
          largestGreenCount =
            greenCount > largestGreenCount ? greenCount : largestGreenCount;
        }
        if (item.includes("blue")) {
          let blueCount = parseInt(item.slice(0, item.indexOf("blue")));

          largestBlueCount =
            blueCount > largestBlueCount ? blueCount : largestBlueCount;
        }
      });

      res.blueCount = largestBlueCount;
      res.redCount = largestRedcount;
      res.greenCount = largestGreenCount;
    });

    gameData.push(res);
  });

  return gameData;
}

function getPossibleGameSum(gameData) {
  let possibleGameSum = 0;

  gameData.forEach((game) => {
    if (
      game.blueCount <= blueCubes &&
      game.greenCount <= greenCubes &&
      game.redCount <= redCubes
    ) {
      possibleGameSum += parseInt(game.game);
    }
  });

  return possibleGameSum;
}

function getMinimumGamePowerSum(gameData) {
  let powerSum = 0;

  gameData.forEach((game) => {
    let gamePower = game.redCount * game.blueCount * game.greenCount;
    powerSum += gamePower;
  });

  return powerSum;
}

// Main operations
readData().then((data) => {
  let games = data.split("\n");
  let gameData = parseGameData(games);
  let gameSum = getPossibleGameSum(gameData);
  let minimumGamePowerSum = getMinimumGamePowerSum(gameData);

  console.log("gameSum", gameSum);
  console.log("minimumGamePowerSum", minimumGamePowerSum);
});
