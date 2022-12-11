#[derive(Debug)]
pub enum Operation {
    SUM(i64),
    MULTIPLY(i64),
}

#[derive(Debug)]
pub struct Monkey {
    pub(crate) divisible_by: i64,
    operation: Operation,
    pub items: Vec<i64>,
    monkeys: (usize, usize),
    pub(crate) count: i64,
}

impl Monkey {
    pub fn calculate_new_worry(self: &Self, old_worry: i64) -> i64 {
        return match self.operation {
            Operation::SUM(amount) => {
                if amount < 0 {
                    old_worry + old_worry
                } else {
                    old_worry + amount
                }
            }
            Operation::MULTIPLY(amount) => {
                if amount < 0 {
                    old_worry * old_worry
                } else {
                    old_worry * amount
                }
            }
        };
    }

    pub fn decide_next_monkey_index(self: &Self, new_worry: i64) -> usize {
        if new_worry % self.divisible_by == 0 {
            self.monkeys.0
        } else {
            self.monkeys.1
        }
    }

    pub fn end_turn(self: &mut Self) {
        self.count += self.items.len() as i64;
        self.items.clear()
    }
}

fn parse_items(line: &str) -> Vec<i64> {
    line.trim_start_matches("Starting items: ")
        .split(", ")
        .map(|num| num.parse().unwrap())
        .collect()
}

fn parse_worry(line: &str) -> Operation {
    let (op, amount) = line.trim_start_matches("Operation: new = old ").split_once(' ').unwrap();

    match amount {
        "old" => {
            match op {
                "*" => Operation::MULTIPLY(-1),
                "+" => Operation::SUM(-1),
                _ => panic!("Invalid operation")
            }
        }
        _ => {
            let amount = amount.parse::<i64>().expect("A valid amount number");
            match op {
                "*" => Operation::MULTIPLY(amount),
                "+" => Operation::SUM(amount),
                _ => panic!("Invalid operation")
            }
        }
    }
}

fn parse_divisible_by(line: &str) -> i64 {
    line.trim_start_matches("Test: divisible by ").parse().expect("To parse divisible by ")
}

fn parse_monkeys(if_true: &str, if_false: &str) -> (usize, usize) {
    (
        if_true.trim_start_matches("If true: throw to monkey ").parse().unwrap(),
        if_false.trim_start_matches("If false: throw to monkey ").parse().unwrap(),
    )
}

pub fn parse_input(input: String) -> Vec<Monkey> {
    input
        .split("\n\n")
        .map(|monkey| {
            monkey.lines()
                .skip(1)
                .map(|line| line.trim())
                .collect::<Vec<&str>>()
        })
        .map(|lines| {
            let items = parse_items(lines.iter().nth(0).unwrap());
            let operation = parse_worry(lines.iter().nth(1).unwrap());
            let divisible_by = parse_divisible_by(lines.iter().nth(2).unwrap());
            let monkeys = parse_monkeys(lines.iter().nth(3).unwrap(), lines.iter().nth(4).unwrap());

            Monkey {
                monkeys,
                divisible_by,
                items,
                operation,
                count: 0,
            }
        })
        .collect()
}
