import { evaluatePair, parseInput } from "./common.mjs";


export function execute(input) {
    const pairs = parseInput(input)

    let result = 0;

    pairs.forEach((pair, index) => {
        let ordered = evaluatePair(pair);
        if (ordered === 1) {
            result += index + 1
        }
    })

    return result
}