import json

import joblib
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from sklearn.dummy import DummyClassifier

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
df = pd.read_csv("./data.csv")
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


@app.route("/predict", methods=["GET", "POST"])
@cross_origin()
def gen_predictions():
    if request.method == "GET":
        tdf = df.copy().drop(
            columns=["Player", "Team", "Conference", "Position", "Division"]
        )
        tdf = tdf.fillna(0)
        tdf.drop(columns=["Stars", "PlayerId", "Transfer_Portal"], inplace=True)
        input_data = tdf.iloc[0].values.reshape(1, -1)
        prediction = gbr_clf.predict(input_data)
        probability = gbr_clf.predict_proba(input_data)

        return jsonify(
            model="Gradient Boosting Classifier",
            prediction=int(prediction[0]),
            probability=[float(x) for x in probability[0]],
        )


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
