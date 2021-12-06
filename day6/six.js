const fs = require('fs');
const assert = require("assert");
const f = fs.readFileSync('input.txt', 'utf8');
const fishList = f.split(',').map((d) => Number(d));
calculateFish = (days) => {
    let fishMap = new Array(9).fill(0);
    for (const fish of fishList) {
        fishMap[fish] += 1;
    }
    for (let day = 0; day <= days - 1; day++) {
        let newFishMap = new Array(9).fill(0);
        let oldFish = 0;
        for (let i = 0; i <= fishMap.length - 1; i++) {
            if (i === 0) {
                newFishMap[8] = fishMap[i];
                oldFish = fishMap[i];
                continue;
            }
            newFishMap[i - 1] = fishMap[i];
        }
        newFishMap[6] += oldFish;
        fishMap = newFishMap;
    }
    return fishMap.reduce((count, fish) => count + fish, 0);
}
const countPart1= calculateFish(80);
const countPart2 = calculateFish(256);
console.log(countPart1, countPart2);
assert(countPart2 === 1634946868992);