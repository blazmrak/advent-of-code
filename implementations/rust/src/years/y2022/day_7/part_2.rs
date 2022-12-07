use super::common::collect_dirs;

pub fn execute(input: String) -> String {
    let mut dirs = collect_dirs(input);
    let empty_space = 70_000_000 - dirs.get(&String::from("/")).unwrap();
    dirs.values().filter(|size| empty_space + **size > 30_000_000).min().unwrap().to_string()
}