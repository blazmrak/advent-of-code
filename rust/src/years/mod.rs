mod y2022;

pub fn solve_problem(year: i16, day: i8, part: i8, input: String) -> String {
    if year == 2022 {
        if day == 1 {
            if part == 1 {
                return y2022::days::day_1::part_1::execute(input).to_string();
            } else if part == 2 {
                return y2022::days::day_1::part_2::execute(input).to_string();
            } else {
                panic!("not found");
            }
        } else {
            panic!("not found");
        }
    } else {
        panic!("not found");
    }
}