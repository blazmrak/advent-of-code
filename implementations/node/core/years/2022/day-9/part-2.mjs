import { iAmBeingExecuted } from "../../../files/execution.mjs";
import { readInputString } from "../../../files/read-file.mjs";
import { dragRope, initRope, parseInput } from "./common.mjs";

export function execute(input) {
    const rope = initRope(10)
    const directions = parseInput(input)
    return dragRope(rope, directions)
}

if (iAmBeingExecuted(import.meta.url)) {
    console.log(execute(readInputString(2022, 9, 1, 'real')))
}