import json

import joblib
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
df = pd.read_csv("./data.csv")
df = df.fillna(0)
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
gbr_clf = joblib.load("gbr_clf.joblib")


def gen_cols_json(cols):
    return df[cols].drop_duplicates().to_dict(orient="records")


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
    df_player = df[df["PlayerId"] == playerId].drop(columns=excluded_cols)
    model_input = df_player.mean().values.reshape(1, -1)

    prediction = gbr_clf.predict(model_input)
    probability = gbr_clf.predict_proba(model_input)

    res = [
        {
            "model": "Gradient Boosting Classifier",
            "prediction": int(prediction[0]),
            "probability": [float(x) for x in probability[0]],
        }
    ]

    return jsonify(res)


@app.route("/predict/manual", methods=["POST"])
@cross_origin()
def gen_predictions_manual():
    print(request.json)
    # playerId = request.json["playerId"]
    # df_player = df[df["PlayerId"] == playerId].drop(columns=excluded_cols)
    # model_input = df_player.mean().values.reshape(1, -1)

    # prediction = gbr_clf.predict(model_input)
    # probability = gbr_clf.predict_proba(model_input)

    res = [
        {
            "model": "Gradient Boosting Classifier",
            "prediction": int(0),
            "probability": [0.5, 0.5],
        }
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
