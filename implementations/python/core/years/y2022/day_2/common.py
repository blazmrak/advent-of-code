def parse_input(inp: str, *parse_values) -> [tuple]:
    return [[parse_values(val[0], val[1]) for val in game.split(' ')] for game in inp.split('\n')]
