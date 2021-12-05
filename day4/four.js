const fs = require('fs');
const assert = require("assert");
const f = fs.readFileSync('input.txt', 'utf8');
const data = f.split(/\r?\n/);
const numberPool  = data.shift().split(',').map(d => Number(d));
let bingoCards = [];
let index = -1;
data.forEach((row) => {
    if (row === '') {
        index += 1;
    }
    bingoCards[index] ? bingoCards[index].push(row) : bingoCards[index] = [];
});
bingoCards = bingoCards.map((card) => card.map(
    (row) => row.split(/(?=(?:...)*$)/ ).map(d => Number(d))));
const isWinning = (e, drawnNumbers) => {
    let win = true;
    e.forEach((i) => {if (! drawnNumbers.includes(i)) {win = false}});
    return win;
}
const winningCards = [];
for (let i = 5; i <= numberPool.length; i++) {
    const drawnNumbers = numberPool.slice(0, i);
    let cardIndex = -1;
    let winningCard = null;
    for (const card of bingoCards) {
        cardIndex += 1;
        const winningRows = card.filter((e) => isWinning(e, drawnNumbers));
        if (winningRows.length > 0) {
            winningCard = card
            winningCards.push({card: winningCard, drawnNumbers: drawnNumbers});
            bingoCards.splice(cardIndex, 1);
            continue;
        }
        let vertical = [];
        for (let i = 0; i < 5; i++) {
            for (const  e of card) {
                vertical[i] ? vertical[i].push(e[i]) : vertical[i] = [e[i]];
            }
        }
        const winningVertical = vertical.filter((e) => isWinning(e, drawnNumbers));
        if (winningVertical.length > 0) {
            winningCard = card
            winningCards.push({card: winningCard, drawnNumbers: drawnNumbers});
            bingoCards.splice(cardIndex, 1);
        }
    }
}
const calculateScore = (win) => {
    const drawnNumbers = win.drawnNumbers;
    let sum = 0;
    for (const  row of win.card) {
        for (const e of row) {
            if (! drawnNumbers.includes(e)) {
                sum += e;
            }
        }
    }
    return sum * drawnNumbers[drawnNumbers.length - 1];
}
// part 1
const win = winningCards[0];
const winScore = calculateScore(win);
console.log(winScore);
assert(winScore === 39902);
// part 2
const loose = winningCards[winningCards.length - 1];
const looseScore = calculateScore(loose);
console.log(looseScore);
assert(looseScore===26936);