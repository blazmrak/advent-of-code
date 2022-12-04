use crate::years::y2022::day_3::common::sum_common_items_in_compartments;

fn split_into_threes(lines: &String) -> Vec<Vec<&str>> {
    let mut collector: Vec<Vec<&str>> = vec![];
    let mut temp: Vec<&str> = vec![];
    for (index, line) in lines.split('\n').enumerate() {
        if index > 0 && index % 3 == 0 {
            collector.push(temp);
            temp = vec![]
        }

        temp.push(line);
    }

    collector.push(temp);

    return collector;
}

pub fn execute(input: String) -> i32 {
    sum_common_items_in_compartments(split_into_threes(&input))
}