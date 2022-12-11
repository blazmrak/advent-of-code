import { executeInstructions, parseInput } from "./common.mjs";

export function execute(input) {
    const [columns, instructions] = parseInput(input)
    return executeInstructions(columns, instructions, (columns, [n, from, to]) => {
        for(let i = 0; i < n; i++) {
            columns[to].push(columns[from].pop())
        }
    })
}
