import { neighbours, Node, parseInput, Queue } from "./common.mjs";

function isPositionValid(position, world, currentHeight) {
    return world.isInside(position) &&  world.get(position) <= currentHeight + 1
}

export function execute(input) {
    const { start, end, world } = parseInput(input)

    const queue = new Queue([])
    queue.enqueue(new Node([start]))

    let best

    while (queue.hasItems()) {
        const node = queue.dequeue()
        const currentHeight = world.get(node.position)

        if (node.isAt(end)) {
            best = node
            continue
        }

        neighbours(node.position)
            .filter(neighbour => isPositionValid(neighbour, world, currentHeight))
            .map(neighbour => node.append(neighbour))
            .forEach(queue.enqueue.bind(queue))
    }

    return best.distance
}