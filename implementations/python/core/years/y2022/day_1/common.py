def get_top_n_elfs(inp: str, n: int) -> str:
    return str(sum(sorted([sum([int(cals) for cals in elf.split('\n')]) for elf in inp.split('\n\n')], reverse=True)[0:n]))
