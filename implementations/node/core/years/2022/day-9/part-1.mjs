import { dragRope, initRope, parseInput } from "./common.mjs";

export function execute(input) {
    const rope = initRope(2)
    const directions = parseInput(input)
    return dragRope(rope, directions)
}
