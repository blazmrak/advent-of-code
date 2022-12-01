use crate::files::read_input;

pub fn execute(input: String) -> i32 {
    let mut parsed_input = input.split("\n\n")
        .map(|bag| bag.split("\n").map(|calories| calories.parse::<i32>().unwrap()))
        .map(|bag| bag.sum::<i32>())
        .collect::<Vec<i32>>();

    parsed_input.sort_by(|x1, x2| x2.cmp(x1));

    return parsed_input[0 .. 3].iter().sum();
}

#[allow(unused)]
fn main() {
    let contents2 = read_input(2022, 1, 2, String::from("real"));
    let total = execute(contents2);

    println!("Part 2: {total}");
}
