use std::fs;

fn read_input(year: i16, day: i8, part: i8, tipe: String) -> String {
    return fs::read_to_string(format!("{year}/problems/day-{day}/test/part-{part}/{tipe}/input.txt")).expect("Should read the file");
}

fn execute_day1_part1(input: String) -> i32 {
    return input.split("\n\n")
        .map(|bag| bag.split("\n").map(|calories| calories.parse::<i32>().unwrap()))
        .map(|bag| bag.sum::<i32>())
        .max()
        .unwrap();
}

fn execute_day1_part2(input: String) -> i32 {
    let mut parsed_input = input.split("\n\n")
        .map(|bag| bag.split("\n").map(|calories| calories.parse::<i32>().unwrap()))
        .map(|bag| bag.sum::<i32>())
        .collect::<Vec<i32>>();

    parsed_input.sort_by(|x1, x2| x2.cmp(x1));

    return parsed_input[0 .. 3].iter().sum();
}


fn main() {
    let contents = read_input(2022, 1, 1, String::from("real"));
    let elf_bags = execute_day1_part1(contents);

    println!("Part 1: {elf_bags}");

    let contents2 = read_input(2022, 1, 2, String::from("real"));
    let total = execute_day1_part2(contents2);

    println!("Part 2: {total}");
}
