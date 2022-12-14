import { createMap, extractDimensions, getTile, parseInput } from "./common.mjs";

function dropSand(map, dimensions) {
    let count = 0
    let [y, x] = [0, 500 - dimensions.left + 1]

    for (let i = 0; true; i++) {
        while (getTile(map, [y + 1, x]) === '.') {
            y++
        }
        if (getTile(map, [y + 1, x - 1]) === '.') {
            y++
            x--
            continue
        }
        if (getTile(map, [y + 1, x + 1]) === '.') {
            y++
            x++
            continue
        }
        if (getTile(map, [y + 1, x]) === '-') {
            break
        } else {
            map[y][x] = 'o'
            count++
            y = 0
            x = 500 - dimensions.left + 1
        }
    }

    return count
}

export function execute(input) {
    const paths = parseInput(input)
    const dimensions = extractDimensions(paths)
    const map = createMap(paths, dimensions)

    return dropSand(map, dimensions)
}