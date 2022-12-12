import { heightAtPosition, Node, parseInput, Queue } from "./common.mjs";

export function execute(input) {
    const { start, end, map } = parseInput(input)

    const queue = new Queue([])
    queue.enqueue(new Node([start]))

    let best

    let i = 0

    while (queue.hasItems()) {
        const node = queue.dequeue()
        const currentHeight = heightAtPosition(map, node.position)
        const [y, x] = node.position

        if (node.isAt(end)) {
            best = node
            continue
        }

        let newPos = [y - 1, x]
        if (y > 0 && heightAtPosition(map, newPos) <= currentHeight + 1) {
            queue.enqueue(node.append(newPos))
        }

        newPos = [y + 1, x]
        if (y < map.length - 1 && heightAtPosition(map, newPos) <= currentHeight + 1) {
            queue.enqueue(node.append(newPos))
        }

        newPos = [y, x - 1]
        if (x > 0 && heightAtPosition(map, newPos) <= currentHeight + 1) {
            queue.enqueue(node.append(newPos))
        }

        newPos = [y, x + 1]
        if (x < map[0].length - 1 && heightAtPosition(map, newPos) <= currentHeight + 1) {
            queue.enqueue(node.append(newPos))
        }

        i++
    }

    return best.distance
}