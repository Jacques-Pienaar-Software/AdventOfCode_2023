const fs = require("fs");

const data = fs.readFileSync("./inputs/day4_input.txt", {
  encoding: "utf-8",
});

const splitLines = data.split("\r\n");

function getCardObjects(cardData) {
  let res = [];

  cardData.forEach((card) => {
    let cardObject = {};
    cardObject.id = getCardId(card);

    let cardValues = getCardValues(card);

    cardObject.givenNumbers = cardValues[1];
    cardObject.winningNumbers = cardValues[0];

    res.push(cardObject);
  });

  return res;
}

function getCardId(card) {
  let res = card.slice(card.indexOf("d") + 1, card.indexOf(":"));
  return res.trim();
}

function getCardValues(card) {
  let res = card.slice(card.indexOf(":") + 1, card.length);
  res = res.split("|");
  res[0] = res[0].split(" ").filter((value) => value != "");
  res[1] = res[1].split(" ").filter((value) => value != "");

  return res;
}

function getSumOfPoints() {
  let sum = 0;

  let cardObjects = getCardObjects(splitLines);

  cardObjects.forEach((card) => {
    let acc = getPointsWonPerCard(card);
    sum += acc;
  });

  return sum;
}

function getPointsWonPerCard(card) {
  let givenNumbers = card.givenNumbers;
  let winningNumbers = card.winningNumbers;
  let acc = 0;

  winningNumbers.forEach((winningNumber) => {
    if (givenNumbers.includes(winningNumber) && acc == 0) {
      acc = 1;
    } else if (givenNumbers.includes(winningNumber) && acc != 0) {
      acc = acc * 2;
    }
  });

  return acc;
}

function getCopiedScratchCards(cards) {
  let count = 0;

  while (count < cards.length) {
    let cardValue = getPointsWonPerCard(cards[count]);
    console.log(cardValue);
    if (cardValue > 0) {
      for (let i = count; i < count + cardValue; i++) {
        let cardToAdd = cards.find((card) => {
          card.id == i;
        });
        cards.push(cardToAdd);
      }
    }

    count++;
  }

  return count;
}

const cards = getCardObjects(splitLines);

console.log(getCopiedScratchCards(cards));
