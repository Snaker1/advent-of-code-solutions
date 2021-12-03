const fs = require('fs');
const f = fs.readFileSync('input.txt', 'utf8');
const data = f.split("\n").map(entry => entry.split(' '));
const applyCommands = (commands, state) => {
    data.forEach(entry => {
        let [command, value] = entry;
        value = Number(value);
        commands[command] ? commands[command](state, value) : null;
    });
}

// Part 1
let commands = {
    'forward' : (state, value) => state.horizontal += value,
    'down' : (state, value) => state.depth += value,
    'up' : (state, value) => state.depth -= value,
};
let state = { horizontal : 0, depth : 0}
applyCommands(commands, state)
console.log(state.horizontal, state.depth, state.horizontal * state.depth);

// Part 2
commands = {
    'forward' : (state, value) => {
        state.horizontal += value;
        state.depth += value * state.aim;
    },
    'down' : (state, value) => state.aim += value,
    'up' : (state, value) => state.aim -= value, 
};
state = { horizontal : 0, depth: 0, aim : 0}
applyCommands(commands, state)
console.log(state.horizontal, state.depth, state.horizontal * state.depth);