use super::common::parse_trees;

pub fn execute(input: String) -> String {
    let matrix = parse_trees(input);
    let mut max_view = 0;
    for i in 1..matrix.len() - 1 {
        for j in 1..matrix.len() - 1 {
            let mut view = 1;
            let max_height = matrix[i][j].height;

            view *= {
                let mut visible = 1;
                for k in j + 1..matrix.len() - 1 {
                    if matrix[i][k].height < max_height {
                        visible += 1;
                    } else {
                        break;
                    }
                }

                visible
            };

            view *= {
                let mut visible = 1;
                for k in (1..j).rev() {
                    if matrix[i][k].height < max_height {
                        visible += 1;
                    } else {
                        break;
                    }
                }

                visible
            };

            view *= {
                let mut visible = 1;
                for k in i + 1..matrix.len() - 1 {
                    if matrix[k][j].height < max_height {
                        visible += 1;
                    } else {
                        break;
                    }
                }

                visible
            };

            view *= {
                let mut visible = 1;
                for k in (1..i).rev() {
                    if matrix[k][j].height < max_height {
                        visible += 1;
                    } else {
                        break;
                    }
                }

                visible
            };

            if max_view < view {
                max_view = view
            }
        }
    }

    max_view.to_string()
}