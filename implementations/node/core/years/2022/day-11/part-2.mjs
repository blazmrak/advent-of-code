import { parseInput, playRounds } from "./common.mjs";


export function execute(input) {
    const monkeys = parseInput(input, (operation) => (worry) => operation(worry))
    return playRounds(monkeys, 10_000)
}
