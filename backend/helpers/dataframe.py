import pandas as pd


def gen_df():
    df = pd.read_csv("csv/players.csv")
    return df


def gen_cols_json(df, cols):
    return df[cols].drop_duplicates().dropna().to_dict(orient="records")


positions = [
    "QB",
    "RB",
    "WR",
    "DL",
    "DB",
    "DE",
    "TE",
    "S ",
    "LB",
    "CB",
    "DT",
]
