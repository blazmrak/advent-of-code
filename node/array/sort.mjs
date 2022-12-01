export const Sorter = {
    ascending(x1, x2) {
        return x2 - x1
    }
}

export function sortAscending(arr) {
    return arr.sort(Sorter.ascending)
}
