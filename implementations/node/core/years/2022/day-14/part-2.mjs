import { createMap, dropSand, extractDimensions, parseInput } from "./common.mjs";

const padding = 167

export function execute(input) {
    const paths = parseInput(input)
    const dimensions = extractDimensions(paths)
    const map = createMap(paths, dimensions, padding)

    return dropSand(map, dimensions, (map, position) => map.get(position) === 'o', padding)
}