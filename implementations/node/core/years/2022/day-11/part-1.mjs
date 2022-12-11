import { parseInput, playRounds } from "./common.mjs";

export function execute(input) {
    const monkeys = parseInput(input, (operation) => (worry) => Math.floor(operation(worry) / 3))
    return playRounds(monkeys, 20)
}