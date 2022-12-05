import { iAmBeingExecuted } from "../../../files/execution.mjs";
import { readInputString } from "../../../files/read-file.mjs";
import { executeInstructions, parseInput } from "./common.mjs";

export function execute(input) {
    const [columns, instructions] = parseInput(input)
    return executeInstructions(columns, instructions, (columns, [n, from, to]) => {
        let movedCrates = columns[from].splice(columns[from].length - n, n);
        columns[to].push(...movedCrates)
    })
}

if (iAmBeingExecuted(import.meta.url)) {
    console.log(execute(readInputString(2022, 5, 2, 'real')))
}