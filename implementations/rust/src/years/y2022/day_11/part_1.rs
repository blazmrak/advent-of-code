use crate::years::y2022::day_11::common::parse_input;

pub fn execute(input: String) -> String {
    let mut monkeys = parse_input(input);

    for _ in 0..20 {
        for i in 0..monkeys.len() {
            let monkey = monkeys.iter_mut().nth(i).unwrap();
            let next_items = monkey.items
                .iter()
                .map(|old_worry| {
                    let new_worry = monkey.calculate_new_worry(*old_worry) / 3;
                    let next_index = monkey.decide_next_monkey_index(new_worry) ;
                    (next_index, new_worry)
                })
                .collect::<Vec<(usize, i64)>>();

            monkey.end_turn();
            for (next_index, new_worry) in next_items.iter() {
                monkeys.iter_mut().nth(*next_index).unwrap().items.push(*new_worry);
            }
        }
    }

    let mut counts = monkeys.iter()
        .map(|monkey| monkey.count)
        .collect::<Vec<i64>>();

    counts.sort();

    (counts.iter().rev().nth(0).unwrap() * counts.iter().rev().nth(1).unwrap()).to_string()
}