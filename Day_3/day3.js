var fs = require("fs");
const { nextTick } = require("process");

const data = fs.readFileSync("./inputs/day3_input_test.txt", {
  encoding: "utf-8",
});

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const specialCharacters = ["*", "$", "+", "#", "=", "%", "@", "/", "&"];

let splitLines = data.split("\r\n").map((line) => {
  return line.split("");
});

function getPartNumbersFromSet(prevLine, currLine, nextLine) {
  let partNumbers = [];
  let number = "";
  let specialCharDetected = false;

  if (!prevLine && currLine && nextLine) {
    for (let i = 0; i <= currLine.length; i++) {
      if (numbers.includes(currLine[i])) {
        number += currLine[i];

        if (
          number.length == 1 &&
          (specialCharacters.includes(currLine[i - 1]) ||
            specialCharacters.includes(nextLine[i - 1]))
        ) {
          specialCharDetected = true;
        }

        if (specialCharacters.includes(nextLine[i])) {
          specialCharDetected = true;
        }

        if (!numbers.includes(currLine[i + 1])) {
          if (
            specialCharacters.includes(currLine[i + 1]) ||
            specialCharacters.includes(nextLine[i + 1])
          ) {
            specialCharDetected = true;
          }

          if (specialCharDetected) {
            partNumbers.push(number);
            number = "";
            specialCharDetected = false;
          }
        }
      }
    }
  }

  if (prevLine && currLine && !nextLine) {
    for (let i = 0; i <= currLine.length; i++) {
      if (numbers.includes(currLine[i])) {
        number += currLine[i];

        if (
          number.length == 1 &&
          (specialCharacters.includes(currLine[i - 1]) ||
            specialCharacters.includes(prevLine[i - 1]))
        ) {
          specialCharDetected = true;
        }

        if (specialCharacters.includes(prevLine[i])) {
          specialCharDetected = true;
        }

        if (!numbers.includes(currLine[i + 1])) {
          if (
            specialCharacters.includes(currLine[i + 1]) ||
            specialCharacters.includes(prevLine[i + 1])
          ) {
            specialCharDetected = true;
          }

          if (specialCharDetected) {
            partNumbers.push(number);
            number = "";
            specialCharDetected = false;
          }
        }
      }
    }
  }

  if (prevLine && currLine && nextLine) {
    for (let i = 0; i <= currLine.length; i++) {
      if (numbers.includes(currLine[i])) {
        number += currLine[i];

        if (
          number.length == 1 &&
          (specialCharacters.includes(currLine[i - 1]) ||
            specialCharacters.includes(prevLine[i - 1]) ||
            specialCharacters.includes(nextLine[i - 1]))
        ) {
          specialCharDetected = true;
        }

        if (
          specialCharacters.includes(prevLine[i]) ||
          specialCharacters.includes(nextLine[i])
        ) {
          specialCharDetected = true;
        }

        if (!numbers.includes(currLine[i + 1])) {
          if (
            specialCharacters.includes(currLine[i + 1]) ||
            specialCharacters.includes(prevLine[i + 1]) ||
            specialCharacters.includes(nextLine[i + 1])
          ) {
            specialCharDetected = true;
          }

          if (specialCharDetected) {
            partNumbers.push(number);
            number = "";
            specialCharDetected = false;
          }
        }
      }
    }
  }

  return partNumbers;
}

function getPartNumbers(lines) {
  let result = [];

  for (let i = 0; i < lines.length; i++) {
    let partNumbers = getPartNumbersFromSet(
      lines[i - 1],
      lines[i],
      lines[i + 1]
    );

    if (partNumbers.length > 0) {
      partNumbers.forEach((number) => {
        result.push(number);
      });
    }
  }

  return result;
}

let partNumberResult = getPartNumbers(splitLines).reduce(
  (accumulator, value) => {
    return parseInt(accumulator) + parseInt(value);
  }
);

console.log(partNumberResult);
