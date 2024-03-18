import json
from flask import Flask, request
from sklearn.dummy import DummyClassifier
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/", methods=["GET", "POST"])
@cross_origin()
def index():
    if request.method == "GET":
        return json.dumps({"status": "success"})
    if request.method == "POST":
        data = json.loads(request.data)
        clf = DummyClassifier()
        return data
