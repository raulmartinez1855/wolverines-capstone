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
    data = json.loads(request.data)
    print(data)
    clf = DummyClassifier()
    return data
