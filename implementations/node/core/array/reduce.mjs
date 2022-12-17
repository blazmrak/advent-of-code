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

export function group(arr, n) {
    const res = []

    while (arr.length > 0) {
        res.push(arr.splice(0, n))
    }

    return res
}
