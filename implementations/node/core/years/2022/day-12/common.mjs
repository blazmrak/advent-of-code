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
    const lines = input.split('\n').map(line => line.split(''))
    const [height, width] = [lines.length, lines[0].length]

    const map = new Array(height).fill(0).map(() => new Array(width).fill(0))
    let start;
    let end;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            switch (lines[i][j]) {
                case 'S':
                    start = [i, j]
                    break
                case 'E':
                    end = [i, j]
                    map[i][j] = 26
                    break
                default:
                    map[i][j] = lines[i][j].charCodeAt(0) - 96
                    break
            }
        }
    }

    return {
        start,
        end,
        map
    }
}

export function heightAtPosition(map, position) {
    return map[position[0]][position[1]]
}
