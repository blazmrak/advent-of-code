mod y2022;

pub fn solve_problem(year: i16, day: i8, part: i8, input: String) -> String {
    if year == 2022 {
        if day == 1 {
            if part == 1 {
                return y2022::day_1::part_1::execute(input).to_string();
            } else if part == 2 {
                return y2022::day_1::part_2::execute(input).to_string();
            }
        } else if day == 2 {
            if part == 1 {
                return y2022::day_2::part_1::execute(input).to_string();
            } else if part == 2 {
                return y2022::day_2::part_2::execute(input).to_string();
            }
        } else if day == 3 {
            if part == 1 {
                return y2022::day_3::part_1::execute(input).to_string();
            } else if part == 2 {
                return y2022::day_3::part_2::execute(input).to_string();
            }
        } else if day == 4 {
            if part == 1 {
                return y2022::day_4::part_1::execute(input).to_string();
            } else if part == 2 {
                return y2022::day_4::part_2::execute(input).to_string();
            }
        }
    }

    panic!("not found")
}