import json

import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from helpers.dataframe import gen_df
from helpers.classifiers import get_player_proba

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
df = gen_df()


def gen_cols_json(cols):
    return df[cols].drop_duplicates().dropna().to_dict(orient="records")


def gen_prediction_json(name, probability):

    return {
        "model": name,
        "probability": probability,
    }


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

    print(get_player_proba(player))

    res = [
        gen_prediction_json("Gradient Boosting Classifier", get_player_proba(player))
    ]

    return jsonify(res)


@app.route("/predict/manual", methods=["POST"])
@cross_origin()
def gen_predictions_manual():
    model_input = pd.DataFrame(data=request.json, index=[0])
    res = [
        gen_prediction_json(
            "Gradient Boosting Classifier", get_player_proba(model_input)
        )
    ]

    return jsonify(res)


@app.route("/mappings", methods=["GET"])
@cross_origin()
def get_player_mappings():
    if request.method == "GET":

        seasons = gen_cols_json(["Season"])
        players = gen_cols_json(["PlayerId", "Player", "Team"])
        positions = gen_cols_json(["PositionId", "Position"])
        teams = gen_cols_json(["TeamId", "Team"])
        conferences = gen_cols_json(["ConferenceId", "Conference"])

        return jsonify(
            seasons=seasons,
            players=players,
            positions=positions,
            teams=teams,
            conferences=conferences,
        )
