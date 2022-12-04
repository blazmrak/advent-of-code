use super::common::{Pair, parse_input};

pub fn execute(input: String) -> i32 {
    return parse_input(&input)
        .filter(|Pair { x, y }| x.fully_contains(y) || y.fully_contains(x))
        .count() as i32;
}