use std::collections::HashMap;

fn navigate(current: &String, new: &str) -> String {
    return if new == ".." {
        let parent = current.rfind(|char| char == '/').expect("Last index of /");
        String::from(&current[..parent])
    } else {
        String::from(format!("{current}/{new}"))
    };
}

pub fn collect_dirs(input: String) -> HashMap<String, i32> {
    let mut dirs = HashMap::new();
    let mut dir: String = String::from("");
    input.lines().for_each(|line| {
        if line.starts_with("$") {
            let split = line.split(' ').collect::<Vec<&str>>();
            if split[1] == "cd" {
                dir = navigate(&dir, split[2]);
            }
        } else if !line.starts_with("dir") {
            let size_str = line.split_once(' ');
            let size: i32 = size_str.unwrap().0.parse().unwrap();

            let path = dir.split('/');
            let mut temp = String::from("");
            for partial in path {
                temp = format!("{temp}{partial}/");
                dirs.entry(temp.clone()).or_insert(0);
                dirs.entry(temp.clone()).and_modify(|val| *val += size);
            }
        }
    });

    return dirs
}
