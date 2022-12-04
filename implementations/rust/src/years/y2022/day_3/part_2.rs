use crate::years::y2022::day_3::common::sum_common_items_in_compartments;

fn split_into_threes(input: &String) -> Vec<Vec<&str>> {
    let mut collector: Vec<Vec<&str>> = vec![];
    let mut chunk: Vec<&str> = vec![];
    for (index, line) in input.lines().enumerate() {
        if index > 0 && index % 3 == 0 {
            collector.push(chunk);
            chunk = vec![]
        }

        chunk.push(line);
    }

    collector.push(chunk);

    return collector;
}

pub fn execute(input: String) -> i32 {
    sum_common_items_in_compartments(split_into_threes(&input))
}