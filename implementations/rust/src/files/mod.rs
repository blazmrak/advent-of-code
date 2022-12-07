use std::fs;

#[allow(unused)]
pub fn read_input(year: i16, day: i8, part: i8, tipe: String) -> String {
    return fs::read_to_string(format!("{year}/problems/day-{day}/test/part-{part}/{tipe}/input.txt")).expect("Should read the file");
}

