use std::collections::HashSet;

#[derive(Debug)]
pub enum Direction {
    RIGHT(i32),
    LEFT(i32),
    UP(i32),
    DOWN(i32),
}

#[derive(Clone, Debug)]
pub struct Knot {
    x: i32,
    y: i32,
}

pub struct Rope {
    knots: Vec<Knot>,
}

impl Direction {
    fn parse(input: &str) -> Self {
        let (direction, amount) = input.split_once(' ').unwrap();
        let amount = amount.parse::<i32>().unwrap();
        match direction {
            "R" => Direction::RIGHT(amount),
            "L" => Direction::LEFT(amount),
            "U" => Direction::UP(amount),
            "D" => Direction::DOWN(amount),
            &_ => panic!("Invalid direction")
        }
    }
}

impl Rope {
    pub fn new(length: usize) -> Rope {
        Rope {
            knots: vec![Knot { x: 0, y: 0 }; length]
        }
    }
    fn drag(&mut self, direction: Direction) {
        let head = match direction {
            Direction::RIGHT(_) => {
                self.knots.first()
                    .map(|Knot { x, y }| Knot { x: x + 1, y: *y })
                    .unwrap()
            }
            Direction::LEFT(_) => {
                self.knots.first()
                    .map(|Knot { x, y }| Knot { x: x - 1, y: *y })
                    .unwrap()
            }
            Direction::UP(_) => {
                self.knots.first()
                    .map(|Knot { x, y }| Knot { x: *x, y: y + 1 })
                    .unwrap()
            }
            Direction::DOWN(_) => {
                self.knots.first()
                    .map(|Knot { x, y }| Knot { x: *x, y: y - 1 })
                    .unwrap()
            }
        };
        self.knots.remove(0);
        self.knots.insert(0, head);

        for i in 1..self.knots.len() {
            if self.knots[i].x - self.knots[i - 1].x < -1 {
                self.knots[i].x += 1;

                if self.knots[i].y - self.knots[i - 1].y <= -1 {
                    self.knots[i].y += 1
                } else if self.knots[i].y - self.knots[i - 1].y >= 1 {
                    self.knots[i].y -= 1
                }
            } else if self.knots[i].x - self.knots[i - 1].x > 1 {
                self.knots[i].x -= 1;

                if self.knots[i].y - self.knots[i - 1].y <= -1 {
                    self.knots[i].y += 1
                } else if self.knots[i].y - self.knots[i - 1].y >= 1 {
                    self.knots[i].y -= 1
                }
            } else if self.knots[i].y - self.knots[i - 1].y < -1 {
                self.knots[i].y += 1;

                if self.knots[i].x - self.knots[i - 1].x <= -1 {
                    self.knots[i].x += 1
                } else if self.knots[i].x - self.knots[i - 1].x >= 1 {
                    self.knots[i].x -= 1
                }
            } else if self.knots[i].y - self.knots[i - 1].y > 1 {
                self.knots[i].y -= 1;

                if self.knots[i].x - self.knots[i - 1].x <= -1 {
                    self.knots[i].x += 1
                } else if self.knots[i].x - self.knots[i - 1].x >= 1 {
                    self.knots[i].x -= 1
                }
            }
        }
    }

    fn last(&self) -> String {
        let last = self.knots.last().unwrap();
        format!("{}-{}", last.x, last.y)
    }
}

pub fn parse_directions(input: String) -> Vec<Direction> {
    input.lines()
        .map(|line| Direction::parse(line))
        .collect()
}

pub fn drag_rope(rope: &mut Rope, directions: Vec<Direction>) -> usize {
    let mut visited: HashSet<String> = HashSet::new();

    for direction in directions {
        match direction {
            Direction::RIGHT(amount) => {
                for _ in 0..amount {
                    rope.drag(Direction::RIGHT(1));
                    visited.insert(rope.last());
                }
            }
            Direction::LEFT(amount) => {
                for _ in 0..amount {
                    rope.drag(Direction::LEFT(1));
                    visited.insert(rope.last());
                }
            }
            Direction::UP(amount) => {
                for _ in 0..amount {
                    rope.drag(Direction::UP(1));
                    visited.insert(rope.last());
                }
            }
            Direction::DOWN(amount) => {
                for _ in 0..amount {
                    rope.drag(Direction::DOWN(1));
                    visited.insert(rope.last());
                }
            }
        }
    }

    visited.len()
}
