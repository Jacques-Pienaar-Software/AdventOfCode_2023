// EXPECTED ANSWER: 55614

// Import fs module and create a readstream
var fs = require("fs");
var readStream = fs.createReadStream("./inputs/day1_input.txt", "utf-8");

// Initialize constant helper arrays for checking numbers
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const numberWords = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

// Read the data from the text file
let readData = (callback) => {
  let data = "";

  readStream
    .on("data", function (line) {
      data += line;
    })
    .on("end", () => {
      callback(data);
    });
};

// Check for words that describe a number (moving forwards)
function checkNumberWordsForwards(numberWord) {
  let result = numbers[numberWords.findIndex((word) => word == numberWord)];

  if (result == undefined) {
    result =
      numbers[numberWords.findIndex((word) => word == numberWord.slice(0, 4))];
  }

  if (result == undefined) {
    result =
      numbers[numberWords.findIndex((word) => word == numberWord.slice(0, 3))];
  }

  return result;
}

// Check for words that describe a number (moving backwards)
function checkNumberWordsBackwards(numberWord) {
  let result = numbers[numberWords.findIndex((word) => word == numberWord)];

  if (result == undefined) {
    result =
      numbers[numberWords.findIndex((word) => word == numberWord.slice(1, 5))];
  }

  if (result == undefined) {
    result =
      numbers[numberWords.findIndex((word) => word == numberWord.slice(2, 5))];
  }

  return result;
}

let x = readData(async (data) => {
  let lines = data.split("\n");

  let totalSum = 0;

  lines.forEach((line) => {
    let front = 0;
    let back = line.length;
    let firstNumber = -1;
    let lastNumber = -1;

    while (front <= line.length && back >= 0) {
      // Check for a number in the string (from the front)
      if (firstNumber == -1 && numbers.includes(line[front])) {
        firstNumber = line[front];
      }

      // check for a number in the string (from the back)
      if (lastNumber == -1 && numbers.includes(line[back])) {
        lastNumber = line[back];
      }

      // Check for a number word (from the front)
      let frontNumberWordFound = -1;
      let backNumberWordFound = -1;
      if (front + 5 < line.length) {
        frontNumberWordFound = checkNumberWordsForwards(
          line.slice(front, front + 5)
        );
      } else if (front + 4 < line.length) {
        frontNumberWordFound = checkNumberWordsForwards(
          line.slice(front, front + 4)
        );
      } else if (front + 3 < line.length) {
        frontNumberWordFound = checkNumberWordsForwards(
          line.slice(front, front + 3)
        );
      }

      if (
        firstNumber == -1 &&
        frontNumberWordFound != -1 &&
        frontNumberWordFound != undefined
      ) {
        firstNumber = frontNumberWordFound;
      }

      if (back - 5 >= 0) {
        backNumberWordFound = checkNumberWordsBackwards(
          line.slice(back - 5, back)
        );
      } else if (back - 4 >= 0) {
        backNumberWordFound = checkNumberWordsBackwards(
          line.slice(back - 4, back)
        );
      } else if (back - 3 >= 0) {
        backNumberWordFound = checkNumberWordsBackwards(
          line.slice(back - 3, back)
        );
      }

      if (
        lastNumber == -1 &&
        backNumberWordFound != -1 &&
        backNumberWordFound != undefined
      ) {
        lastNumber = backNumberWordFound;
      }

      front++;
      back--;
    }

    totalSum += parseInt(firstNumber.toString() + lastNumber.toString());
  });

  console.log(totalSum);
});
