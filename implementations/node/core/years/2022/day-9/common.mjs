export function dragRope(rope, directions) {
    const set = new Set()
    directions.forEach(([direction, steps]) => {
        for (let i = 0; i < steps; i++) {
            switch (direction) {
                case 'R':
                    rope[0][1]++
                    break
                case 'L':
                    rope[0][1]--
                    break
                case 'U':
                    rope[0][0]++
                    break
                case 'D':
                    rope[0][0]--
            }

            for (let i = 1; i < rope.length; i++) {
                if (rope[i][0] - rope[i - 1][0] < -1) {
                    rope[i][0]++
                    if (rope[i][1] - rope[i - 1][1] <= -1) {
                        rope[i][1]++
                    } else if (rope[i][1] - rope[i - 1][1] >= 1) {
                        rope[i][1]--
                    }
                } else if (rope[i][0] - rope[i - 1][0] > 1) {
                    rope[i][0]--
                    if (rope[i][1] - rope[i - 1][1] <= -1) {
                        rope[i][1]++
                    } else if (rope[i][1] - rope[i - 1][1] >= 1) {
                        rope[i][1]--
                    }
                } else if (rope[i][1] - rope[i - 1][1] < -1) {
                    rope[i][1]++
                    if (rope[i][0] - rope[i - 1][0] <= -1) {
                        rope[i][0]++
                    } else if (rope[i][0] - rope[i - 1][0] >= 1) {
                        rope[i][0]--
                    }
                } else if (rope[i][1] - rope[i - 1][1] > 1) {
                    rope[i][1]--
                    if (rope[i][0] - rope[i - 1][0] <= -1) {
                        rope[i][0]++
                    } else if (rope[i][0] - rope[i - 1][0] >= 1) {
                        rope[i][0]--
                    }
                }
            }
            set.add(`${rope[rope.length - 1][0]}-${rope[rope.length - 1][1]}`)
        }
    })
    return set.size
}

export function initRope(size) {
    return new Array(size).fill(0).map(() => [0, 0])
}

export function parseInput(input) {
    return input.split('\n')
        .map(line => line.split(' '))
        .map(([_, steps]) => [_, parseInt(steps, 10)])
}
