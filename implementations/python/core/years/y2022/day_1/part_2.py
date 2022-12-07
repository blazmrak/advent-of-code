from .common import get_top_n_elfs


def execute(in_str: str) -> str:
    return str(sum(get_top_n_elfs(in_str, 3)))