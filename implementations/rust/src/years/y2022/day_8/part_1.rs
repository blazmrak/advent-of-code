use std::collections::HashSet;
use super::common::{parse_trees, Tree};

pub fn execute(input: String) -> String {
    let matrix: Vec<Vec<Tree>> = parse_trees(input);
    let mut visible_trees: HashSet<String> = HashSet::new();

    for i in 0..matrix.len() {
        let mut min = -1;
        for j in 0..matrix.len() {
            if matrix[i][j].height > min {
                min = matrix[i][j].height;
                visible_trees.insert(matrix[i][j].hash());
            }
        }
    }

    for i in 0..matrix.len() {
        let mut min = -1;
        for j in (0..matrix.len()).rev() {
            if matrix[i][j].height > min {
                min = matrix[i][j].height;
                visible_trees.insert(matrix[i][j].hash());
            }
        }
    }

    for j in 0..matrix.len() {
        let mut min = -1;
        for i in 0..matrix.len() {
            if matrix[i][j].height > min {
                min = matrix[i][j].height;
                visible_trees.insert(matrix[i][j].hash());
            }
        }
    }

    for j in 0..matrix.len() {
        let mut min = -1;
        for i in (0..matrix.len()).rev() {
            if matrix[i][j].height > min {
                min = matrix[i][j].height;
                visible_trees.insert(matrix[i][j].hash());
            }
        }
    }

    visible_trees.len().to_string()
}