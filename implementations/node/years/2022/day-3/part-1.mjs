import { iAmBeingExecuted } from "../../../files/execution.mjs";
import { readInputString } from "../../../files/read-file.mjs";
import { sumCommonItems } from "./common.mjs";

function splitInCompartments(str) {
    return [str.substring(0, str.length / 2), str.substring(str.length / 2)]
}

function parseInput(input) {
   return input.split('\n').map(splitInCompartments)
}

export function execute(input) {
    return sumCommonItems(parseInput(input))
}

if (iAmBeingExecuted(import.meta.url)) {
    console.log(execute(readInputString(2022, 3, 1, 'toy')))
}