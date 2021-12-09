const fs = require('fs');
const assert = require("assert");
const data = fs.readFileSync('input.txt', 'utf8')
    .split(/\r?\n/).filter(i => i)
    .map(e => e.split('|')
        .map(i => i.split(' ').filter(i => i).map(e => [...e].sort())));
const digitMap = {
    2 : 1,
    4 : 4,
    3 : 7,
    7 : 8,
}
let resultPart1 = 0;
let resultPart2 = 0;
for (const [log, digits] of data) {
    // part 1
    resultPart1 += digits.reduce((count, d) => digitMap[d.length] ? count + 1 : count, 0);
    // part 2
    let pattern = [];
    for (const e of log) {
        if (digitMap[e.length]) {
            pattern[digitMap[e.length]] = e;
        }
    }
    for (const e of log) {
        if (e.length === 6) {
            if (pattern[4].every(i => e.includes(i))) {
                pattern[9] = e;
            } else if (pattern[1].every(i => e.includes(i))) {
                pattern[0] = e;
            } else {
                pattern[6] = e;
            }
        } else if (e.length === 5) {
            if (pattern[1].every(i => e.includes(i))) {
                pattern[3] = e;
            } else if (pattern[4].reduce((count, i) => e.includes(i) ? count+1 : count, 0) === 3) {
                pattern[5] = e;
            } else {
                pattern[2] = e;
            }
        }
    }
    let mapping = {};
    let i = 0
    for (const e of pattern) {
        mapping[e] = i;
        i += 1;
    }
    let result = digits.map(d => mapping[d]);
    resultPart2 += Number(result.join(''));
}
console.log(resultPart1, resultPart2);
assert(resultPart1 === 318)
assert(resultPart2 === 996280)
