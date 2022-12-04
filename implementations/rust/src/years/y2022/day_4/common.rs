use std::iter::Map;
use std::str::Lines;

#[derive(Debug, PartialEq, Clone)]
pub struct Limit {
    pub lower: i32,
    pub upper: i32,
}

impl Limit {
    fn from(mut limits: impl Iterator<Item=i32>) -> Self {
        Self {
            lower: limits.next().unwrap(),
            upper: limits.next().unwrap(),
        }
    }

    fn has(&self, elt: i32) -> bool {
        self.lower <= elt && elt <= self.upper
    }

    pub(crate) fn fully_contains(self: &Self, other: &Self) -> bool {
        self.lower <= other.lower && other.upper <= self.upper
    }

    pub(crate) fn intersects(self: &Self, other: &Self) -> bool {
        self.has(other.lower) || self.has(other.upper)
    }
}

#[derive(Debug, PartialEq)]
pub struct Pair {
    pub x: Limit,
    pub y: Limit,
}

impl Pair {
    fn from(mut limits: impl Iterator<Item=Limit>) -> Self {
        return Self {
            x: limits.next().unwrap(),
            y: limits.next().unwrap(),
        };
    }
}

fn parse_limit(limit: &str) -> Limit {
    Limit::from(
        limit
            .split('-')
            .map(|limit| limit.parse::<i32>().unwrap())
    )
}

fn parse_pair(pair_str: &str) -> Pair {
    Pair::from(
        pair_str
            .split(',')
            .map(|limit_str| parse_limit(limit_str))
    )
}

pub fn parse_input(input: &String) -> Map<Lines<'_>, fn(&str) -> Pair> {
    input
        .lines()
        .map(parse_pair as fn(&str) -> Pair)
}
