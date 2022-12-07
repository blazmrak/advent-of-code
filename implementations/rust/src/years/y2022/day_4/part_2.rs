use super::common::{Pair, parse_input};

pub fn execute(input: String) -> String {
    return parse_input(&input)
        .filter(|Pair { x, y }| x.intersects(y) || y.intersects(x))
        .count()
        .to_string();
}