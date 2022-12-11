import { executeInstructions, parseInput } from "./common.mjs";

export function execute(input) {
    const [columns, instructions] = parseInput(input)
    return executeInstructions(columns, instructions, (columns, [n, from, to]) => {
        let movedCrates = columns[from].splice(columns[from].length - n, n);
        columns[to].push(...movedCrates)
    })
}
