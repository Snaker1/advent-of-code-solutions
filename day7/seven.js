const fs = require('fs');
const assert = require("assert");
const f = fs.readFileSync('input.txt', 'utf8');
const crabs = f.split(',')
    .map((d) => Number(d))
    .sort((a, b) => a - b);
const median = crabs[crabs.length/2];
const fuelPart1 = crabs.reduce((count, p) => count + Math.abs(p - median), 0);
const total = crabs.reduce((count, p) => count + p, 0);
const average = Math.floor(total / crabs.length);
const calcGauss = (m) => {
    return (Math.pow(m, 2) + m) / 2;
}
const fuelPart2 =  crabs.reduce((count, p) => count + calcGauss(Math.abs(p - average)), 0);
console.log(fuelPart1, fuelPart2);
assert(fuelPart1 ===347449);
assert(fuelPart2 ===98039527);
