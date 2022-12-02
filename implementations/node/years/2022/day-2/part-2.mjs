import { iAmBeingExecuted } from "../../../files/execution.mjs";
import { readInputString } from "../../../files/read-file.mjs";
import { playRounds } from "./common.mjs";

function parseInput(input) {
    return input.split('\n')
        .map(line => toValue(...line.split(' ')))
}

function toValue(opponent, result) {
    if(opponent === 'A') {
        if(result === 'X') return [1, 3]
        else if(result === 'Y') return [1, 1]
        else return [1, 2]
    } else if(opponent === 'B') {
        if(result === 'X') return [2, 1]
        else if(result === 'Y') return [2, 2]
        else return [2, 3]
    } else {
        if(result === 'X') return [3, 2]
        else if(result === 'Y') return [3, 3]
        else return [3, 1]
    }
}

export function execute(input) {
    return playRounds(input, parseInput)
}

if(iAmBeingExecuted(import.meta.url)) {
    console.log(execute(readInputString(2022, 2, 2, 'toy')))
}