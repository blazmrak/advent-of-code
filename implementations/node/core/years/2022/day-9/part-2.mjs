import { dragRope, initRope, parseInput } from "./common.mjs";

export function execute(input) {
    const rope = initRope(10)
    const directions = parseInput(input)
    return dragRope(rope, directions)
}
