export const Sorter = {
    descending(x1, x2) {
        return x2 - x1
    },
    ascending(x1, x2) {
        return x1 - x2
    }
}

export function sortAscending(arr) {
    return arr.sort(Sorter.descending)
}
