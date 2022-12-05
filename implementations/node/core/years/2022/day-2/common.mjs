import { Reducer } from "../../../array/reduce.mjs";

export function play(player1, player2) {
    if(player1 === player2) {
        return 0
    }

    if(player1 === 1) {
        if(player2 === 2) return 1
        else if(player2 === 3) return -1
    } else if(player1 === 2) {
        if(player2 === 1) return -1
        else if(player2 === 3) return 1
    } else {
        if(player2 === 1) return 1
        else if(player2 === 2) return -1
    }
}

export function score(value, result) {
    return value + (result+1) * 3
}

export function playRounds(input, parser) {
    return parser(input)
        .map(([p1, me]) => [me, play(p1, me)])
        .map((val) => score(...val))
        .reduce(Reducer.sum)
}
