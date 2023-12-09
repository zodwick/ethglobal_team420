import subprocess

# Define the command you want to run
command = "cargo stylus check"

# Run the command and capture the output
result = subprocess.run(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

# Check if the command was successful
if result.returncode == 0:
    # Print the output
    print("Command output:")
    print(result.stdout)
else:
    # Print the error message
    print("Error executing command:")
    print(result.stderr)
