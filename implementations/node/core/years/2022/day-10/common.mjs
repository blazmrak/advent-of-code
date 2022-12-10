export function states(input) {
    const commands = input.split('\n')
        .map(line => line.split(' '))
        .map(line => [line[0], parseInt(line[1], 10)])

    const state = [{ x: 1 }]
    commands.forEach(command => {
        const last = state[state.length - 1]
        switch (command[0]) {
            case 'noop':
                state.push(last)
                break
            case 'addx':
                state.push(last, { ...last, x: last.x + command[1] })
                break
        }
    })
    state.push({ x: -1 })

    return state
}
