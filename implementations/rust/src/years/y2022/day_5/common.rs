fn parse_columns(rows: &str) -> Vec<Vec<char>> {
    let mut lines = rows.lines().collect::<Vec<&str>>();
    let n_columns = lines.pop().unwrap().len() / 4 + 1;

    let mut columns: Vec<Vec<char>> = vec![vec![]; n_columns as usize];

    for line in lines {
        let n_line_columns = (line.len() - line.len() / 4) / 3;
        for i in 0..n_line_columns {
            let ith_column_value = line.chars().nth(1 + i + i * 3).unwrap();
            if ith_column_value != ' ' {
                columns[i].insert(0, ith_column_value);
            }
        }
    }

    return columns;
}

fn parse_instructions(instructions: &str) -> Vec<[i8; 3]> {
    return instructions
        .lines()
        .map(|instruction| {
            instruction.split(' ')
                .map(|word| {
                    let num = word.parse().unwrap_or(-1);
                    return num
                })
                .filter(|value| *value > 0)
                .collect::<Vec<i8>>()
        })
        .map(|instruction| [instruction[0], instruction[1] - 1, instruction[2] - 1])
        .collect();
}

pub fn parse_input(input: &str) -> (Vec<Vec<char>>, Vec<[i8; 3]>) {
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
