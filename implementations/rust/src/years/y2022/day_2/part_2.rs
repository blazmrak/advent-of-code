fn to_value(val: char) -> i8 {
    return if val == 'A' || val == 'X' {
        1
    } else if val == 'B' || val == 'Y' {
        2
    } else {
        3
    }
}

fn parse_line(line: &str) -> (i8, i8) {
    let opponent = to_value(line.chars().nth(0).unwrap());
    let expected = line.chars().nth(2).unwrap();

    return if expected == 'Y' {
        (opponent, opponent)
    } else if expected == 'X' {
        if opponent == 1 {
            (opponent, 3)
        } else if opponent == 2 {
            (opponent, 1)
        } else {
            (opponent, 2)
        }
    } else {
        if opponent == 1 {
            (opponent, 2)
        } else if opponent == 2 {
            (opponent, 3)
        } else {
            (opponent, 1)
        }
    }
}

fn parse_input<'a>(input: String) -> Vec<(i8, i8)> {
    return input.split("\n").map(|line| parse_line(line)).collect()
}

fn play(opponent: i8, me: i8) -> i8 {
    return if opponent == me {
        0
    } else {
        if opponent == 1 {
            if me == 2 {
                1
            } else {
                -1
            }
        } else if opponent == 2 {
            if me == 3 {
                1
            } else {
                -1
            }
        } else {
            if me == 1 {
                1
            } else {
                -1
            }
        }
    }
}

fn score(me: i8, result: i8) -> i8 {
    return me + (result + 1) * 3
}

pub fn execute(input: String) -> String {
    return parse_input(input)
        .iter()
        .map(|(opponent, me)| (*me, play(*opponent, *me)))
        .map(|(me, result)| score(me, result))
        .fold(0, |acc, el| acc + el as i32)
        .to_string()
}