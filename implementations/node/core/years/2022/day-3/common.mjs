import { Reducer } from "../../../array/reduce.mjs";

function assignPriority(char) {
    if ('a' <= char && char <= 'z') {
        return char.charCodeAt(0) - 'a'.charCodeAt(0) + 1
    } else {
        return char.charCodeAt(0) - 'A'.charCodeAt(0) + 27
    }
}

function toPriority(half) {
    return half.split('').map(assignPriority)
}

function unique(acc, item) {
    return acc.add(item)
}

function onlyItemsThatAppearInAllCompartments(compartments) {
    const [compartment1, ...otherCompartments] = compartments

    return [...compartment1].filter(item => otherCompartments.every(compartment => compartment.has(item)))
}

export function sumCommonItems(itemGroups) {
    return itemGroups
        .map(compartments => compartments.map(toPriority))
        .map(compartments => compartments.map(compartment => compartment.reduce(unique, new Set())))
        .flatMap(onlyItemsThatAppearInAllCompartments)
        .reduce(Reducer.sum)
}
