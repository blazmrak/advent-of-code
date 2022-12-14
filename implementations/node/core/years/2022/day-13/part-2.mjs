import { evaluatePair, parseInput } from "./common.mjs";

export function execute(input) {
    const pairs = parseInput(input)
    pairs.push([[[2]], [[6]]])

    let result = 1;

    const sorted = pairs.flatMap((pair) => pair).sort((p1, p2) => -1 *  evaluatePair([p1, p2]))

    for(let i = 0; i < sorted.length; i++) {
        const packet = sorted[i]

        if(packet.length === 1 && packet[0].length === 1) {
            if(packet[0][0] === 2 || packet[0][0] === 6) {
                result *= (i + 1)
            }
        }
    }

    return result
}