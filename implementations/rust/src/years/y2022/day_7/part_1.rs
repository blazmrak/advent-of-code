use super::common::collect_dirs;

pub fn execute(input: String) -> String {
    let dirs = collect_dirs(input);
    dirs.values().filter(|size| **size < 100_000).sum::<i32>().to_string()
}