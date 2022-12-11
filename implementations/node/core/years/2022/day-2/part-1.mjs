import { playRounds } from "./common.mjs";

function parseInput(input) {
    return input.split('\n')
        .map(line => line.split(' ').map(toValue))
}

function toValue(char) {
    if (char === 'A' || char === 'X') {
        return 1
    } else if (char === 'B' || char === 'Y') {
        return 2
    } else {
        return 3
    }
}

export function execute(input) {
    return playRounds(input, parseInput)
}
