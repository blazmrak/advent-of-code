use super::common::detect_first_unique_window;

pub fn execute(input: String) -> String {
    detect_first_unique_window(input.as_str(), 4).to_string()
}