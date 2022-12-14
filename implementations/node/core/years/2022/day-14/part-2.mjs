import { createMap, extractDimensions, getTile, parseInput } from "./common.mjs";

const padding = 167

function dropSand(map, dimensions, padding = 1) {
    let count = 0
    let [y, x] = [0, 500 - dimensions.left + padding]

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
        if (getTile(map, [y, x]) === 'o') {
            break
        } else {
            map[y][x] = 'o'
            count++
            y = 0
            x = 500 - dimensions.left + padding
        }
    }

    return count
}

export function execute(input) {
    const paths = parseInput(input)
    const dimensions = extractDimensions(paths)
    const map = createMap(paths, dimensions, padding)

    return dropSand(map, dimensions, padding)
}