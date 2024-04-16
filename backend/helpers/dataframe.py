import pandas as pd


def gen_df():
    df = pd.read_csv("csv/data.csv")
    df = df.fillna(0)
    return df


excluded_cols = [
    "Player",
    "Team",
    "Conference",
    "Position",
    "Division",
    "Stars",
    "PlayerId",
    "Transfer_Portal",
]