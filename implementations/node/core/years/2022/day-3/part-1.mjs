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
