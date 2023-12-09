from flask import Flask
from flask import request
from codegen import CodeGen
from scriptrun import Check,Deploy
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
    return {"Code": Code}


@app.route("/check", methods=["POST"])
def check():
    prompt = request.json["prompt"]
    language = request.json["language"]
    checkOutput = Check(prompt, language)
    return {"checkOutput": checkOutput}

@app.route("/deploy", methods=["POST"])
def deploy():
    prompt = request.json["prompt"]
    language = request.json["language"]
    deployOutput = Deploy(prompt, language)
    return {"deployOutput": deployOutput}
