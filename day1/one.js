const fs = require('fs');
const f = fs.readFileSync('input.txt', 'utf8');
const data = f.split("\n").map((i) => Number(i));
let countIncreases = (data) => {
    let count = 0;
    let [last] = data;
    data.forEach(current => {
        if (current > last) {
            count += 1;
        }
        last = current;
    });
    return count;
}
let [preLast, last, ...rest] = data;
let threeSums = [];
rest.forEach(current => {
    threeSums.push(current + last + preLast)
    preLast = last;
    last = current;
});
console.log(countIncreases(data),countIncreases(threeSums));