import { Mapper } from "../../../array/map.mjs";
import { World } from "../../../world-map/world.mjs";
import { zip } from "../../../array/for.mjs";

export function parseInput(input) {
    return World.fromString(input, '\n', ' -> ')
        .map((value) => value.split(',').map(Mapper.toInt))
        .raw
}

export function createMap(paths, dimensions, padding = 1) {
    let width = dimensions.right - dimensions.left + padding * 2 + 1;
    const map = World.withDimensions(width, dimensions.bottom + 1, '.')
        .pushRowOf('.')
        .pushRowOf('-')

    paths.forEach(path => {
        zip(path).forEach(([[x, y], [xNext, yNext]]) => {
            while (x !== xNext || y !== yNext) {
                map.set([x - dimensions.left + padding, y], '#')

                x = x < xNext ? x + 1 : x === xNext ? x : x - 1
                y = y < yNext ? y + 1 : y === yNext ? y : y - 1
            }

            map.set([x - dimensions.left + padding, y], '#')
        })
    })

    return map
}

export function extractDimensions(paths) {
    const dimensions = {
        left: 500,
        right: 500,
        bottom: 0,
    }

    paths.forEach(path => {
        path.forEach(([x, y]) => {
            if (x < dimensions.left) {
                dimensions.left = x
            }
            if (x > dimensions.right) {
                dimensions.right = x
            }
            if (y > dimensions.bottom) {
                dimensions.bottom = y
            }
        })
    })

    return dimensions
}

export function dropSand(map, dimensions, stopOn, padding = 1) {
    let count = 0
    let [y, x] = [0, 500 - dimensions.left + padding]

    while(true) {
        while (map.get([x, y + 1]) === '.') {
            y++
        }
        if (map.get([x - 1, y + 1]) === '.') {
            y++
            x--
            continue
        }
        if (map.get([x + 1, y + 1]) === '.') {
            y++
            x++
            continue
        }

        if (stopOn(map, [x, y])) {
            break
        } else {
            map.set([x, y], 'o')
            count++
            y = 0
            x = 500 - dimensions.left + padding
        }
    }

    return count
}
