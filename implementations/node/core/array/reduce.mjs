export const Reducer = {
    sum(x1, x2) {
        return x1 + x2
    },
    multiply(x1, x2) {
        return x1 * x2
    }
}

export function sumArray(bag) {
    return bag.reduce(Reducer.sum)
}
