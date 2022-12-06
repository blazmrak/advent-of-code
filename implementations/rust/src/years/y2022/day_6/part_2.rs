use super::common::detect_first_unique_window;

pub fn execute(input: String) -> i32 {
    return detect_first_unique_window(input.as_str(), 14) as i32
}