var fs = require("fs");

var readStream = fs.createReadStream("day1_input.txt", "utf-8");

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

let getData = (callback) => {
  let data = "";

  readStream
    .on("data", function (line) {
      data += line;
    })
    .on("end", () => {
      callback(data);
    });
};

getData((data) => {
  let lines = data.split("\n");
  let rollingTotal = 0;

  lines.forEach((line) => {
    let front = 0;
    let back = line.length - 1;
    let firstNumber = -1;
    let lastNumber = -1;

    while (front <= line.length && back >= 0) {
      if (firstNumber == -1 && numbers.includes(line[front])) {
        firstNumber = line[front];
      }

      if (lastNumber == -1 && numbers.includes(line[back])) {
        lastNumber = line[back];
      }

      front++;
      back--;
    }

    rollingTotal += parseInt(firstNumber.toString() + lastNumber.toString());
  });

  console.log(rollingTotal);
});
