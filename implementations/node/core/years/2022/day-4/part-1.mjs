import { iAmBeingExecuted } from "../../../files/execution.mjs";
import { readInputString } from "../../../files/read-file.mjs";
import { parseInput } from "./common.mjs";

function fullyContains(pair1, pair2) {
    return pair1[0] <= pair2[0] && pair1[1] >= pair2[1]
}

export function execute(input) {
    return parseInput(input)
        .filter(([pair1, pair2]) => fullyContains(pair1, pair2) || fullyContains(pair2, pair1))
        .length
}

if (iAmBeingExecuted(import.meta.url)) {
    console.log(execute(readInputString(2022, 4, 1, 'real')))
}