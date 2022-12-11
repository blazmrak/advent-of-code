import { parseInput } from "./common.mjs";

function fullyContains(pair1, pair2) {
    return pair1[0] <= pair2[0] && pair1[1] >= pair2[1]
}

export function execute(input) {
    return parseInput(input)
        .filter(([pair1, pair2]) => fullyContains(pair1, pair2) || fullyContains(pair2, pair1))
        .length
}
