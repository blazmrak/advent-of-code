use super::common::{Pair, parse_input};

pub fn execute(input: String) -> String {
    return parse_input(&input)
        .filter(|Pair { x, y }| x.fully_contains(y) || y.fully_contains(x))
        .count()
        .to_string();
}