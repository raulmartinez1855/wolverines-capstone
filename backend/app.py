import json
from flask import Flask, request, jsonify
from sklearn.dummy import DummyClassifier
from flask_cors import CORS, cross_origin
import pandas as pd

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
df = pd.read_csv("../Data/Final Dataset.csv")


def gen_cols_json(cols):
    return df[cols].drop_duplicates().to_dict(orient="records")


@app.route("/", methods=["GET", "POST"])
@cross_origin()
def index():
    if request.method == "GET":
        return json.dumps({"status": "success"})
    if request.method == "POST":
        data = json.loads(request.data)
        clf = DummyClassifier()
        return data


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
