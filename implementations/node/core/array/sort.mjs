export const Sorter = {
    ascending(x1, x2) {
        return x2 - x1
    },
    descending(x1, x2) {
        return x1 - x2
    }
}

export function sortAscending(arr) {
    return arr.sort(Sorter.ascending)
}
