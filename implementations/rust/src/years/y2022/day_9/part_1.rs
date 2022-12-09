use crate::years::y2022::day_9::common::{drag_rope, parse_directions, Rope};


pub fn execute(input: String) -> String {
    let mut rope = Rope::new(2);
    let directions = parse_directions(input);

    drag_rope(&mut rope, directions).to_string()
}