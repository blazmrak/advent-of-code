use std::collections::HashMap;

struct FileCursor {
    dirs: HashMap<String, i32>,
    current_dir: String,
}

fn navigate(current: &String, new: &str) -> String {
    return if new == ".." {
        let parent = current.rfind(|char| char == '/').expect("Last index of /");
        String::from(&current[..parent])
    } else {
        String::from(format!("{current}/{new}"))
    };
}

impl FileCursor {
    fn new() -> Self {
        FileCursor {
            dirs: HashMap::new(),
            current_dir: String::from(""),
        }
    }

    fn navigate(&mut self, destination: &str) {
        self.current_dir = navigate(&self.current_dir, destination)
    }

    fn track_file(&mut self, size: i32) {
        let mut temp = String::from("");
        for partial in self.current_dir.split('/') {
            temp.push_str(partial);
            temp.push_str("/");
            self.dirs.entry(temp.clone()).or_insert(0);
            self.dirs.entry(temp.clone()).and_modify(|val| *val += size);
        }
    }
}

pub fn collect_dirs(input: String) -> HashMap<String, i32> {
    let mut file_cursor = FileCursor::new();

    input.lines().for_each(|line| {
        if line.starts_with("$ cd") {
            let destination = line.split(' ').nth(2).unwrap();
            file_cursor.navigate(destination);
        } else if !line.starts_with("dir") && !line.starts_with("$") {
            let size = line.split_once(' ').unwrap();
            let size: i32 = size.0.parse().unwrap();

            file_cursor.track_file(size);
        }
    });

    return file_cursor.dirs;
}
