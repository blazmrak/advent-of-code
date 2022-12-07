pub fn execute(input: String) -> String {
    return input.split("\n\n")
        .map(|bag| bag.split("\n").map(|calories| calories.parse::<i32>().unwrap()))
        .map(|bag| bag.sum::<i32>())
        .max()
        .unwrap()
        .to_string();
}
