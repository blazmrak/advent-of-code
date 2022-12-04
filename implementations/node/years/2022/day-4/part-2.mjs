import { iAmBeingExecuted } from "../../../files/execution.mjs";
import { readInputString } from "../../../files/read-file.mjs";
import { parseInput } from "./common.mjs";

function isBetween(x, pair) {
    return pair[0] <= x && x <= pair[1]
}

function overlaps(pair1, pair2) {
    return isBetween(pair2[0], pair1) || isBetween(pair2[1], pair1)
}

export function execute(input) {
    return parseInput(input)
        .filter(([pair1, pair2]) => overlaps(pair1, pair2) || overlaps(pair2, pair1))
        .length
}

if (iAmBeingExecuted(import.meta.url)) {
    console.log(execute(readInputString(2022, 4, 2, 'real')))
}