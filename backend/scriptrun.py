import subprocess
commands_rs = [
    "cargo stylus check",
    "cargo stylus export-abi",
    "cargo stylus deploy --private-key=7006c6ccdc4d7a46b7ac0007599730f287ca8e8ded9792a66a4102a99f084395",
]
commands_js = [
    "npm run asbuild:release",
    "cargo stylus check --wasm-file-path ./build/release.wasm",
    "cargo stylus deploy --wasm-file-path ./build/release.wasm --private-key=7006c6ccdc4d7a46b7ac0007599730f287ca8e8ded9792a66a4102a99f084395 --estimate-gas-only",
    "cargo stylus deploy --wasm-file-path ./build/release.wasm --private-key=7006c6ccdc4d7a46b7ac0007599730f287ca8e8ded9792a66a4102a99f084395",
    "npm run test:onchain 56"
]


def jsruntime():
    for command in commands_js:
        try:
            # Run the command and capture the output
            command = "cd stylus-as-example_js/ &&" + command
            result = subprocess.run(command, shell=True,
                                    check=True, text=True, capture_output=True)
            # Print the command and its output
            print(f"Command: {command}")
            print("Output:")
            print(result.stdout)
            print("Error (if any):")
            print(result.stderr)
            print("=" * 50)

        except subprocess.CalledProcessError as e:
            # Handle if the command returns a non-zero exit code
            print(f"Command: {command}")
            print(f"Error: {e}")
            print("=" * 50)


def rsruntime(example):

    for command in commands_rs:
        try:
            # Run the command and capture the output
            if example == "hashing":
                command = "cd stylus-as-example_rs/ && " + "cd hashing/ && " + command
            elif example == "voting":
                command = "cd stylus-as-example_rs/ && " + "cd voting/ && " + command
            result = subprocess.run(command, shell=True,
                                    check=True, text=True, capture_output=True)
            # Print the command and its output
            print(f"Command: {command}")
            print("Output:")
            print(result.stdout)
            print("Error (if any):")
            print(result.stderr)
            print("=" * 50)

        except subprocess.CalledProcessError as e:
            # Handle if the command returns a non-zero exit code
            print(f"Command: {command}")
            print(f"Error: {e}")
            print("=" * 50)


def Check(prompt: str, language: str):

    if language == "js" or language == "javascript" or language == "ts" or language == "typescript":
        commands = commands_js[0:2]
        outputlist = []
        for command in commands:
            try:
                # Run the command and capture the output
                command = "cd stylus-as-example_js/ &&" + command
                result = subprocess.run(command, shell=True,
                                        check=True, text=True, capture_output=True)

                outputlist.append({
                    "stdout": result.stdout, "stderr": result.stderr})

            except subprocess.CalledProcessError as e:
                outputlist.append({"stdout": "error", "stderr": e})

        return outputlist

    elif language == "rs" or language == "rust":
        command = commands_rs[0]
        outputlist = []
        try:
            if "hashing" in prompt or "hash" in prompt:
                command = "cd stylus-as-example_rs/ && " + "cd hashing/ && " + command
            elif prompt == "voting":
                command = "cd stylus-as-example_rs/ && " + "cd voting/ && " + command
            result = subprocess.run(command, shell=True,
                                    check=True, text=True, capture_output=True)

            outputlist.append({
                "stdout": result.stdout, "stderr": result.stderr})

        except subprocess.CalledProcessError as e:
            outputlist.append({"stdout": "error", "stderr": e})

        return outputlist

    else:
        return "language not supported"


def Deploy(prompt: str, language: str):
    if language == "js" or language == "javascript" or language == "ts" or language == "typescript":
        command = commands_js[-2]
        outputlist = []
        try:
            # Run the command and capture the output
            command = "cd stylus-as-example_js/ &&" + command
            result = subprocess.run(command, shell=True,
                                    check=True, text=True, capture_output=True)

            outputlist.append({
                "stdout": result.stdout, "stderr": result.stderr})

        except subprocess.CalledProcessError as e:
            outputlist.append({"stdout": "error", "stderr": e})

        return outputlist

    elif language == "rs" or language == "rust":
        print("rust")
        command = commands_rs[2]
        outputlist = []

        try:
            if "hashing" in prompt.lower() or "hash" in prompt.lower():
                command = "cd stylus-as-example_rs/ && " + "cd hashing/ && " + command
            else:
                command = "cd stylus-as-example_rs/ && " + "cd voting/ && " + command
            print(command)
            result = subprocess.run(command, shell=True,
                                    check=True, text=True, capture_output=True)

            outputlist.append(
                {"stdout": result.stdout, "stderr": result.stderr})

        except subprocess.CalledProcessError as e:
            outputlist.append({"stdout": "error", "stderr": e})

        return outputlist

    else:
        return "language not supported"
