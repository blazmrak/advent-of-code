import { iAmBeingExecuted } from "../../../files/execution.mjs";
import { readInputString } from "../../../files/read-file.mjs";
import { parseInput, playRounds } from "./common.mjs";

export function execute(input) {
    const monkeys = parseInput(input, (operation) => (worry) => Math.floor(operation(worry) / 3))
    return playRounds(monkeys, 20)
}

if (iAmBeingExecuted(import.meta.url)) {
    console.log(execute(readInputString(2022, 11, 1, 'real')))
}