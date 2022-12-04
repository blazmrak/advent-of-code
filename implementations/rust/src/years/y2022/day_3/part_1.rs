use crate::years::y2022::day_3::common::sum_common_items_in_compartments;

fn split_into_compartments(line: &str) -> Vec<&str> {
    let split = line.split_at(line.len() / 2);
    return vec![split.0, split.1];
}

fn parse_into_compartments(input: &String) -> Vec<Vec<&str>> {
    return input
        .lines()
        .map(|line| split_into_compartments(line))
        .collect()
}

pub fn execute(input: String) -> i32 {
    sum_common_items_in_compartments(parse_into_compartments(&input))
}