import json
from flask import Flask,jsonify
from flask import request
from codegen import CodeGen, writeCodeToFile
from scriptrun import Check, Deploy
from extract import extract
from ipfs_sentfile import upload_file
import subprocess
import os


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



@app.route("/ipfs", methods=["POST"])
def ipfs():
    # Get the API key from the request headers
    api_key = 'd950c97d.62a441ee89fd4365a0227e3305434e9e'

    language = request.json["language"]
    prompt = request.json["prompt"]

    if language == "js" or language == "javascript" or language == "ts" or language == "typescript":
        file_path = './stylus-as-example_js/assembly/app.ts'

    elif language == "rs" or language == "rust":
        if "hashing" in prompt.lower() or "hash" in prompt.lower():
            file_path = './stylus-as-example_rs/hashing/src/lib.rs'
        else:
            file_path = './stylus-as-example_rs/voting/src/lib.rs'
   

    # Upload the file to IPFS using the upload_file function
    upload_response = upload_file(api_key, file_path)

    # Check if the upload was successful
    if upload_response.status_code == 200:
        # Extract the hash from the JSON response
        ipfs_hash = upload_response.json().get('Hash')
        return jsonify({'ipfs_hash': ipfs_hash}), 200
    else:
        return jsonify({'error': 'File upload to IPFS failed'}), upload_response.status_code

    

@app.route("/onchain", methods=["POST"])
def onchain():
    prompt = request.json["prompt"]
    language = request.json["language"]
    input = request.json["input"]
    program = request.json["program"]

    command = "node test2.js"+program+input
    result = subprocess.run(command, shell=True,
                                    check=True, text=True, capture_output=True)


    return {"output": result.stdout}
    


@app.route("/edit", methods=["POST"])
def edit():
    prompt = request.json["prompt"]
    language = request.json["language"]
    edited_code = request.json["edited_code"]

    if language == "js" or language == "javascript" or language == "ts" or language == "typescript":
        writeCodeToFile(
            code=edited_code, filename="./stylus-as-example_js/assembly/app.ts")
        return "edited"
    
    elif language == "rs" or language == "rust":
        if "hashing" in prompt.lower() or "hash" in prompt.lower():
            writeCodeToFile(
                code=edited_code, filename="./stylus-as-example_rs/hashing/src/lib.rs")
            return "edited"
        else:
            writeCodeToFile(
                code=edited_code, filename="./stylus-as-example_rs/voting/src/lib.rs")
            return "edited"
        
    else:
        return "error"





if __name__ == "__main__":
    app.run(debug=True) 
