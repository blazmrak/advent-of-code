import { iAmBeingExecuted } from "../../../files/execution.mjs";
import { readInputString } from "../../../files/read-file.mjs";
import { parseInput, playRounds } from "./common.mjs";


export function execute(input) {
    const monkeys = parseInput(input, (operation) => (worry) => operation(worry))
    return playRounds(monkeys, 10_000)
}

if (iAmBeingExecuted(import.meta.url)) {
    console.log(execute(readInputString(2022, 11, 1, 'real')))
}
