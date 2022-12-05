fn parse_columns(rows: &str) -> Vec<Vec<char>> {
    let mut lines = rows.lines().collect::<Vec<&str>>();
    let n_columns = lines.pop().unwrap().len() / 4 + 1;

    let mut columns: Vec<Vec<char>> = vec![vec![]; n_columns];

    for line in lines {
        (1..line.len()).step_by(4)
            .map(|index| line.chars().nth(index).unwrap())
            .enumerate()
            .filter(|(_, item)| *item != ' ')
            .for_each(|(column, item)| columns[column].insert(0, item));
    }

    return columns;
}

fn parse_instruction(instruction: &str) -> Vec<usize> {
    instruction.split(' ')
        .skip(1)
        .step_by(2)
        .map(|word| word.parse().unwrap())
        .filter(|value| *value > 0)
        .collect::<Vec<usize>>()
}

fn parse_instructions(instructions: &str) -> Vec<[usize; 3]> {
    return instructions
        .lines()
        .map(|instruction| parse_instruction(instruction))
        .map(|instruction| [instruction[0], instruction[1] - 1, instruction[2] - 1])
        .collect();
}

pub fn parse_input(input: &str) -> (Vec<Vec<char>>, Vec<[usize; 3]>) {
    let (rows, instructions) = input.split_once("\n\n").unwrap();

    let columns = parse_columns(rows);
    let instructions = parse_instructions(instructions);

    return (columns, instructions);
}


pub fn take_tops(columns: &Vec<Vec<char>>) -> Vec<char> {
    return columns.into_iter()
        .map(|column| *column.last().expect("To have an item on top"))
        .collect::<Vec<char>>();
}
