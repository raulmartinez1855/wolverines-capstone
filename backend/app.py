import json

import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from helpers.dataframe import gen_df, gen_cols_json
from helpers.classifiers import get_player_proba

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
df = gen_df()


@app.route("/", methods=["GET", "POST"])
@cross_origin()
def index():
    if request.method == "GET":
        return json.dumps({"status": "success"})
    if request.method == "POST":
        data = json.loads(request.data)
        return data


@app.route("/predict/player", methods=["POST"])
@cross_origin()
def gen_predictions_player():

    playerId = request.json["PlayerId"]
    player = df[df["PlayerId"] == playerId]

    res = [get_player_proba(player)]

    return jsonify(res)


@app.route("/predict/manual", methods=["POST"])
@cross_origin()
def gen_predictions_manual():
    model_input = pd.DataFrame(data=request.json, columns=df.columns, index=[0])
    print(model_input)
    res = [get_player_proba(model_input)]

    return jsonify(res)


@app.route("/mappings", methods=["GET"])
@cross_origin()
def get_player_mappings():
    if request.method == "GET":
        filtered_df = df[
            df.Position.isin(
                ["DT", "DE", "DL", "DB", "CB", "S", "LB", "RB", "QB", "WR", "TE"]
            )
        ]

        seasons = gen_cols_json(filtered_df, ["Season"])
        players = gen_cols_json(filtered_df, ["PlayerId", "Player", "Team", "Position"])
        positions = gen_cols_json(filtered_df, ["PositionId", "Position"])
        teams = gen_cols_json(filtered_df, ["TeamId", "Team"])
        conferences = gen_cols_json(filtered_df, ["ConferenceId", "Conference"])

        return jsonify(
            seasons=seasons,
            players=players,
            positions=positions,
            teams=teams,
            conferences=conferences,
        )
