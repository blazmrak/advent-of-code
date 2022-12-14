export function zip(array, n = 2) {
    return array.splice(n, array.length - n + 1).reduce((acc, el) => {
        acc.push([acc[acc.length - 1][n - 1], el])
        return acc
    }, [array])
}