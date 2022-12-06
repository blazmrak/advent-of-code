use std::collections::HashSet;

pub fn detect_first_unique_window(input: &str, window_size: usize) -> usize {
    input.chars()
        .collect::<Vec<char>>()
        .windows(window_size)
        .map(|window| window.iter().map(|ch| *ch).collect::<HashSet<char>>())
        .enumerate()
        .find(|(_, window)| window.len() == window_size)
        .map(|(index, _)| index + window_size)
        .unwrap()
}