import json
from flask import Flask, jsonify
from flask import request
from codegen import CodeGen
from scriptrun import Check, Deploy
from extract import extract
app = Flask(__name__)


@app.route("/")
def hello():
    return "Hello, World!"


# post request that accepts a text
@app.route("/genCode", methods=["POST"])
def post():
    prompt = request.json["prompt"]
    # example: calculate the square root of a number
    language = request.json["language"]
    Code = CodeGen(prompt, language)
    # replace all space with &nbsp
    # Code = Code.replace(" ", "&nbsp;")
    return {"Code": Code}


@app.route("/check", methods=["POST"])
def check():
    prompt = request.json["prompt"]
    language = request.json["language"]
    checkOutput = Check(prompt, language)
    extracted = extract(str(checkOutput))
    return jsonify({"data": extracted})


@app.route("/deploy", methods=["POST"])
def deploy():
    prompt = request.json["prompt"]
    language = request.json["language"]
    deployOutput = Deploy(prompt, language)
    extracted = extract(str(deployOutput))
    extractedjson = json.dumps(extracted)
    return extractedjson


if __name__ == "__main__":
    app.run(debug=True)
