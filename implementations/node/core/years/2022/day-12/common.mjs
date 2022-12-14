import { World } from "../../../world-map/world.mjs";

function posToString(pos) {
    return `${pos[0]}-${pos[1]}`
}

export class Node {
    constructor(path) {
        this.path = path
    }

    get position() {
        return this.path[this.path.length - 1]
    }

    get distance() {
        return this.path.length - 1
    }

    isAt(position) {
        const current = this.position
        return current[0] === position[0] && current[1] === position[1]
    }

    append(position) {
        return new Node([...this.path, position])
    }
}

export class Queue {
    constructor(items) {
        this.items = items
        this.visited = {}
    }

    enqueue(node) {
        let stringifiedPos = posToString(node.position);
        this.visited[stringifiedPos] ??= 1000

        if (node.distance < this.visited[stringifiedPos]) {
            this.visited[stringifiedPos] = node.distance
            this.items.push(node)
        }
    }

    dequeue() {
        return this.items.shift()
    }

    hasItems() {
        return this.size() > 0
    }

    size() {
        return this.items.length
    }
}

export function parseInput(input) {
    const world = World.fromString(input, '\n', '')
    const start = world.getCoordinateOf('S')
    const end = world.getCoordinateOf('E')
    world.mutate((value) => {
        switch (value) {
            case 'S':
                return 0
            case 'E':
                return 26
            default:
                return value.charCodeAt(0) - 96
        }
    })

    return {
        start,
        end,
        world
    }
}

export function neighbours(position) {
    return [
        [position[0], position[1] - 1],
        [position[0], position[1] + 1],
        [position[0] - 1, position[1]],
        [position[0] + 1, position[1]],
    ]
}
