use super::common::{parse_commands, calculate_register_history};

pub fn execute(input: String) -> String {
    let commands = parse_commands(input);
    let register_history = calculate_register_history(commands);

    let mut screen: Vec<Vec<char>> = vec![vec![]; 6];

    for (cycle, x) in register_history[..240].iter().enumerate() {
        let position = (cycle % 40) as i32;
        let row = cycle / 40;
        if x - 1 <= position && position <= x + 1 {
            screen[row].push('#')
        } else {
            screen[row].push('.')
        }
    }

    let mut sc: String = screen.iter()
        .map(|row| row.iter().collect::<String>())
        .map(|mut row| {
            row.push('\n');
            row
        })
        .collect();
    sc.pop();

    sc
}