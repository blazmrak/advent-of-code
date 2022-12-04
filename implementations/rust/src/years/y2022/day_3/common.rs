fn to_priority(digit: u8) -> i32 {
    return if b'a' <= digit && digit <= b'z' {
        (digit - b'a' + 1) as i32
    } else {
        (digit - b'A' + 27) as i32
    };
}

fn to_priorities(compartment: &str) -> Vec<i32> {
    return compartment.bytes().map(|byte| to_priority(byte)).collect::<Vec<i32>>();
}

pub fn sum_common_items_in_compartments(compartments: Vec<Vec<&str>>) -> i32 {
    compartments
    .into_iter()
        .map(|compartments| compartments.into_iter().map(|compartment| to_priorities(compartment)).collect::<Vec<Vec<i32>>>())
        .map(|mut compartments| {
            for i in 0..compartments.len() {
                compartments[i].sort();
                compartments[i].dedup();
            }
            compartments
        })
        .flat_map(|compartments| {
            let compartment1 = &compartments[0];
            let other_compartments = &compartments[1..];
            return compartment1.into_iter()
                .filter(|element|
                    other_compartments
                        .into_iter()
                        .all(|other_compartment| other_compartment.into_iter().any(|el| el.eq(*element)))
                )
                .map(|el| *el)
                .collect::<Vec<i32>>();
        })
        .sum()
}