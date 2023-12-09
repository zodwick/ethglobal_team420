import subprocess

def jsruntime():
    commands = [
        "npm run asbuild:release",
        "cargo stylus check --wasm-file-path ./build/release.wasm",
        "cargo stylus deploy --wasm-file-path ./build/release.wasm --private-key=YOUR_PRIVATE_KEY --estimate-gas-only",
        "cargo stylus deploy --wasm-file-path ./build/release.wasm --private-key=7006c6ccdc4d7a46b7ac0007599730f287ca8e8ded9792a66a4102a99f084395",
        "npm run test:onchain 56"
    ]
    for command in commands:
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
    commands = [
        "cargo stylus check",
        "cargo stylus export-abi",
        "cargo stylus deploy --private-key=7006c6ccdc4d7a46b7ac0007599730f287ca8e8ded9792a66a4102a99f084395",
    ]
    for command in commands:
        try:
            # Run the command and capture the output
            if example == "hashing":
                command = "cd stylus-as-example_rs/ && " +"cd hashing/ && "+ command
            elif example == "voting":
                command = "cd stylus-as-example_rs/ && " +"cd voting/ && "+ command
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

rsruntime()