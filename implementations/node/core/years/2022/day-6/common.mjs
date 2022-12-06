function containsOnlyUniqueElements(elements) {
    return new Set([...elements]).size === elements.length
}

export function startOfSignal(input, sizeOfWindow) {
    for (let i = sizeOfWindow; i < input.length; i++) {
        if (containsOnlyUniqueElements(input.substring(i - sizeOfWindow, i))) {
            return i
        }
    }
}