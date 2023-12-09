import requests
from ipfs_getfile import get_file


def upload_file(api_key, file_path):
    url = 'https://node.lighthouse.storage/api/v0/add'
    
    headers = {
        'Authorization': f'Bearer {api_key}'
    }

    files = {
        'file': ('output.jpeg', open(file_path, 'rb'))
    }

    response = requests.post(url, headers=headers, files=files)

    return response

# Example usage
api_key = 'd950c97d.62a441ee89fd4365a0227e3305434e9e'
file_path = 'file.png'

upload_response = upload_file(api_key, file_path)

print(upload_response.text)

hash=upload_response.json()['Hash']

print(hash)

print(get_file(hash))



