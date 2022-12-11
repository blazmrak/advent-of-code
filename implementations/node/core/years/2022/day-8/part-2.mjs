import { Mapper } from "../../../array/map.mjs";

export function execute(input) {
    const grid = input.split('\n').map(row => row.split('').map(Mapper.toInt))
    let max = 1

    for (let i = 1; i < grid.length - 1; i++) {
        for (let j = 1; j < grid[i].length - 1; j++) {
            let score = 1

            let temp = 1
            for (let k = i + 1; k < grid.length - 1 && grid[i][j] > grid[k][j]; k++ && temp++) {
            }
            score *= temp

            temp = 1
            for (let k = j + 1; k < grid[0].length - 1 && grid[i][j] > grid[i][k]; k++ && temp++) {
            }
            score *= temp

            temp = 1
            for (let k = i - 1; k > 0 && grid[i][j] > grid[k][j]; k-- && temp++) {
            }
            score *= temp

            temp = 1
            for (let k = j - 1; k > 0 && grid[i][j] > grid[i][k]; k-- && temp++) {
            }
            score *= temp

            if(max < score) max = score
        }
    }


    return max
}
