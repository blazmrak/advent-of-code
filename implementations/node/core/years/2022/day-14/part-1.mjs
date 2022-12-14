import { createMap, dropSand, extractDimensions, parseInput } from "./common.mjs";

export function execute(input) {
    const paths = parseInput(input)
    const dimensions = extractDimensions(paths)
    const map = createMap(paths, dimensions)

    return dropSand(map, dimensions, (map, [x, y]) => map.get([x, y + 1])=== '-')
}