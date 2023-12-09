import requests
import io

def get_file(cid):
    url = f'https://gateway.lighthouse.storage/ipfs/{cid}'
    response = requests.get(url)
    
    if response.status_code == 200:
        # Create a BytesIO object and write the content to it
        buffer = io.BytesIO(response.content)
        
        # Save the content to the specified file path
        with open('./output.png', 'wb') as file:
            file.write(buffer.getvalue())
        
        return f"File saved successfully"
    else:
        return f"Error: {response.status_code}"

# # Example usage
# cid_to_retrieve = 'your_CID_here'
# result = get_file(cid_to_retrieve)

# print(result)
