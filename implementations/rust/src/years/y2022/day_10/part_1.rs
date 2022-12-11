use super::common::{calculate_register_history, parse_commands};

pub fn execute(input: String) -> String {
    let commands = parse_commands(input);
    let register_history = calculate_register_history(commands);

    let signal_strength: i32 = register_history[..220].iter()
        .enumerate()
        .skip(19)
        .step_by(40)
        .map(|(i, x)| (i + 1, x))
        .map(|(i, &x)| (i as i32) * x)
        .sum();

    signal_strength.to_string()
}