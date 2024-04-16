import json

import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from helpers.dataframe import gen_df, excluded_cols
from helpers.classifiers import gbr_clf

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
df = gen_df()
included_cols = [col for col in df.columns if col not in excluded_cols]



def gen_cols_json(cols):
    return df[cols].drop_duplicates().to_dict(orient="records")


def gen_model_prediction(name, model, model_input):
    prediction = model.predict(model_input)
    probability = model.predict_proba(model_input)

    return {
        "model": name,
        "prediction": int(prediction[0]),
        "probability": [float(x) for x in probability[0]],
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
    mean_player_values = (
        df[df["PlayerId"] == playerId].drop(columns=excluded_cols).mean().to_dict()
    )
    model_input = pd.DataFrame(
        data=mean_player_values, columns=included_cols, index=[0]
    )
    print(model_input)
    res = [gen_model_prediction("Gradient Boosting Classifier", gbr_clf, model_input)]

    return jsonify(res)


@app.route("/predict/manual", methods=["POST"])
@cross_origin()
def gen_predictions_manual():
    model_input = pd.DataFrame(data=request.json, columns=included_cols, index=[0])
    res = [gen_model_prediction("Gradient Boosting Classifier", gbr_clf, model_input)]

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
