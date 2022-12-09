#[derive(Debug)]
pub struct Tree {
    x: usize,
    y: usize,
    pub(crate) height: i32,
}

impl Tree {
    pub fn hash(&self) -> String {
        return format!("{}-{}", self.x, self.y);
    }
}

impl Clone for Tree {
    fn clone(&self) -> Self {
        Tree {
            x: self.x,
            y: self.y,
            height: self.height,
        }
    }
}

pub fn parse_trees(input: String) -> Vec<Vec<Tree>> {
    input.lines().enumerate().map(|(i, line)| {
        line.chars()
            .map(|char| char.to_string())
            .map(|str_num| {
                str_num.parse::<i32>().expect("Expect a parsed number")
            })
            .enumerate()
            .map(|(j, height)| Tree {
                x: j,
                y: i,
                height,
            })
            .collect::<Vec<Tree>>()
    }).collect::<Vec<Vec<Tree>>>()
}
