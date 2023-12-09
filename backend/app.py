from flask import Flask
from flask import request,jsonify
from codegen import CodeGen
from scriptrun import Check
from ipfs_sentfile import upload_file


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
    Code = CodeGen(prompt, language)
    return {"Code": Code}


@app.route("/ipfs", methods=["POST"])
def ipfs():
    # Get the API key from the request headers
    api_key = 'd950c97d.62a441ee89fd4365a0227e3305434e9e'

    # Check if the file is included in the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    # Check if the file is not empty
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Specify the file path on the server (adjust as needed)
    file_path = 'uploaded_file.png'

    # Save the uploaded file to the server
    file.save(file_path)

    # Upload the file to IPFS using the upload_file function
    upload_response = upload_file(api_key, file_path)

    # Check if the upload was successful
    if upload_response.status_code == 200:
        # Extract the hash from the JSON response
        ipfs_hash = upload_response.json().get('Hash')
        return jsonify({'ipfs_hash': ipfs_hash}), 200
    else:
        return jsonify({'error': 'File upload to IPFS failed'}), upload_response.status_code

    