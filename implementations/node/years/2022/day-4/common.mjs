import { Mapper } from "../../../array/map.mjs";

export function parseInput(input) {
    return input.split('\n')
        .map(str => str.split(','))
        .map(pair => pair.map(range => range.split('-').map(Mapper.toInt)))
}
