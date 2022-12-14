import { Mapper } from "../../../array/map.mjs";

export function getTile(map, pos) {
    return map[pos[0]][pos[1]]
}

export function parseInput(input) {
    return input.split('\n')
        .map(path => path.split(' -> ').map(position => position.split(',').map(Mapper.toInt)))
}

export function createMap(paths, dimensions, padding = 1) {
    let width = dimensions.right - dimensions.left + padding * 2 + 1;
    const map = new Array(dimensions.bottom + 1).fill(0).map(_ => new Array(width).fill('.'))
    map.push(new Array(width).fill('.'))
    map.push(new Array(width).fill('-'))

    paths.forEach(path => {
        for (let i = 0; i < path.length - 1; i++) {
            let [x, y] = [...path[i]]
            let [xNext, yNext] = [...path[i + 1]]

            while (x !== xNext || y !== yNext) {
                map[y][x - dimensions.left + padding] = '#'

                x = x < xNext ? x + 1 : x === xNext ? x : x - 1
                y = y < yNext ? y + 1 : y === yNext ? y : y - 1
            }

            map[y][x - dimensions.left + padding] = '#'
        }
    })

    return map
}

export function draw(map) {
    console.log(map.map((row, i) => row.join('') + i).join('\n'))
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
