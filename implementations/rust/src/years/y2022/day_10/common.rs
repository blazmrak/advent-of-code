use crate::years::y2022::day_10::common::Command::{ADDX, NOOP};

pub enum Command {
    ADDX(i32),
    NOOP,
}

pub fn parse_commands(input: String) -> Vec<Command> {
    input.lines()
        .map(|line| {
            return if line.starts_with("noop") {
                NOOP
            } else {
                let amount = line.split_whitespace()
                    .nth(1)
                    .map(|amount| amount.parse().expect("A parsable string amount"))
                    .expect("A parsed amount");
                ADDX(amount)
            };
        })
        .collect()
}

pub fn calculate_register_history(commands: Vec<Command>) -> Vec<i32> {
    commands.iter().fold(vec![1], |mut acc, command| {
        match command {
            ADDX(amount) => {
                let last = acc.last().unwrap();
                let next = last + amount;
                acc.push(*last);
                acc.push(next);
            }
            NOOP => {
                let last = acc.last().unwrap();
                acc.push(*last);
            }
        }
        acc
    })
}
