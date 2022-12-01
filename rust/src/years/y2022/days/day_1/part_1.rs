use crate::files::read_input;

pub fn execute(input: String) -> i32 {
    return input.split("\n\n")
        .map(|bag| bag.split("\n").map(|calories| calories.parse::<i32>().unwrap()))
        .map(|bag| bag.sum::<i32>())
        .max()
        .unwrap();
}

#[allow(unused)]
fn main() {
    let contents = read_input(2022, 1, 1, String::from("real"));
    let elf_bags = execute(contents);

    println!("Part 1: {elf_bags}");
}
