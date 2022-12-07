use serde::de::Unexpected::Option;
use SolveProblemError::NotFound;

mod y2022;

const SOLUTIONS_2022: &'static [fn(String) -> String; 12] = &[
    y2022::day_1::part_1::execute,
    y2022::day_1::part_2::execute,
    y2022::day_2::part_1::execute,
    y2022::day_2::part_2::execute,
    y2022::day_3::part_1::execute,
    y2022::day_3::part_2::execute,
    y2022::day_4::part_1::execute,
    y2022::day_4::part_2::execute,
    y2022::day_5::part_1::execute,
    y2022::day_5::part_2::execute,
    y2022::day_6::part_1::execute,
    y2022::day_6::part_2::execute,
];

pub enum SolveProblemError {
    NotFound
}

pub fn solve_problem(year: i16, day: i8, part: i8, input: String) -> Result<String, SolveProblemError> {
    let index = ((day - 1) * 2 + (part - 1)) as usize;
    if year == 2022 {
        return match SOLUTIONS_2022.iter().nth(index) {
            Some(solver) => {
                Ok(solver(input))
            },
            None => {
                Err(NotFound)
            }
        }
    }

    return Err(NotFound)
}