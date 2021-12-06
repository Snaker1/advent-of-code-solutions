const fs = require('fs');
const f = fs.readFileSync('input.txt', 'utf8');
const data = f.split(/\r?\n/).map((e) => e.split(' -> '));
const points = data.map((e) => e.map((i) => i.split(',').map(d => Number(d))));
const calculateScore = (part2=false) =>
{
    let ventMap = [];
    for (let i = 0; i <= 999; i++) {
        ventMap[i] = [];
        for (let k = 0; k <= 999; k++) {
            ventMap[i][k] = 0;
        }
    }
    for (const point of points) {
        const [[fromX, fromY], [toX, toY]] = point;
        if (part2) {
            if (Math.abs(fromX - toX) / Math.abs(fromY - toY) === 1) {
                const end = Math.abs(fromX - toX);
                for (let i = 0; i <= end; i++) {
                    const signX = fromX < toX ? 1 : -1;
                    const signY = fromY < toY ? 1 : -1;
                    const x = fromX + (i * signX);
                    const y = fromY + (i * signY);
                    ventMap[y][x] += 1;
                }
                continue;
            }
        }
        if (fromX === toX) {
            const start = fromY < toY ? fromY : toY;
            const end = fromY < toY ? toY : fromY;
            for (let i = start; i <= end; i++)
                ventMap[i][fromX] += 1;
            continue
        }
        if (fromY === toY) {
            const start = fromX < toX ? fromX : toX;
            const end = fromX < toX ? toX : fromX;
            for (let i = start; i <= end; i++) {
                ventMap[fromY][i] += 1;
            }
        }
    }
    let count = 0;
    for (const row of ventMap) {
        for (const e of row) {
            if (e >= 2) {
                count += 1;
            }
        }
    }
    return count;
}
console.log('Part 1:', calculateScore());
console.log('Part 2:', calculateScore(true));