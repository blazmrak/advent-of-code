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

fn parse_compartments(compartments: Vec<&str>) -> Vec<Vec<i32>> {
    compartments.into_iter().map(|compartment| to_priorities(compartment)).collect::<Vec<Vec<i32>>>()
}

fn is_item_in_all_compartments(compartments: &[Vec<i32>], item: &i32) -> bool {
    compartments.into_iter().all(|other_compartment| other_compartment.contains(item))
}

fn find_common_item_across_compartments<'a>(compartments: &Vec<Vec<i32>>) -> i32 {
    let compartment1 = &compartments[0];
    let other_compartments = &compartments[1..];
    return *compartment1
        .into_iter()
        .find(|item| is_item_in_all_compartments(other_compartments, item))
        .unwrap();
}

pub fn sum_common_items_in_compartments(compartments: Vec<Vec<&str>>) -> i32 {
    compartments
        .into_iter()
        .map(|compartments| parse_compartments(compartments))
        .map(|compartments| find_common_item_across_compartments(&compartments))
        .sum()
}