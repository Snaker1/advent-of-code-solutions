const fs = require('fs');
const f = fs.readFileSync('input.txt', 'utf8');
const data = f.split(/\r?\n/).map(entry => entry.split('').map(d => Number(d)));
const toDecimal = (binary) => {
    return parseInt(binary.join(''), 2)
}
// part 1
let frequency = [];
data.forEach(row => {
    row.forEach((digit, index) => {
      frequency[index] = frequency[index] ? frequency[index] + digit : digit;
    })
})
const average = data.length / 2;
const gammaRate = toDecimal(
    frequency.map((digit) => digit > average ? 1 : 0 )
);
const epsilonRate = toDecimal(
    frequency.map((digit) => digit > average ? 0 : 1 )
);
console.log(gammaRate * epsilonRate);
// part 2
const getRatings = (data, comparisonCallback) => {
    let candidates = data;
    for (const [index, _] in candidates) {
        if (candidates.length <= 1) {
            break
        }
        const count_1 = candidates.reduce((count, e) => e[index] === 1 ? count + 1 : count, 0);
        const count_0 = candidates.length - count_1;
        const nextDigit = comparisonCallback(count_0, count_1) ? 0 : 1;
        candidates = candidates.filter(e => e[index] == nextDigit);
    }
    return toDecimal(candidates[0]);
}
const oxygenGeneratorRating = getRatings(data, (zero, one) => zero > one);
const co2ScrubberRating = getRatings(data, (zero, one) => zero <= one);
console.log(oxygenGeneratorRating * co2ScrubberRating);