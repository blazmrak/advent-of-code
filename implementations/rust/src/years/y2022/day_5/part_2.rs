use crate::years::y2022::day_5::common::{parse_input, take_tops};

fn execute_commands(columns: &mut Vec<Vec<char>>, instructions: Vec<[usize; 3]>) {
    instructions.into_iter().for_each(|[n, from, to]| {
        let remaining_items = columns[from].len() - n;
        let mut top = columns[from].drain(remaining_items..).collect::<Vec<char>>();
        columns[to].append(&mut top);
    })
}

pub fn execute(input: String) -> String {
    let (mut columns, instructions) = parse_input(&input);

    execute_commands(&mut columns, instructions);

    return take_tops(&columns).iter().collect();
}