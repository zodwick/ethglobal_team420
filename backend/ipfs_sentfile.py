import requests
from ipfs_getfile import get_file


def upload_file(api_key, file_path):
    url = 'https://node.lighthouse.storage/api/v0/add'
    
    headers = {
        'Authorization': f'Bearer {api_key}'
    }

    if file_path=='./stylus-as-example_js/assembly/app.ts':
        files = {
            'file': ('code.ts', open(file_path, 'rb'))
        }

    elif file_path=='./stylus-as-example_rs/hashing/src/lib.rs':
        files = {
            'file': ('code.rs', open(file_path, 'rb'))
        }    

    elif file_path=='./stylus-as-example_rs/voting/src/lib.rs':
        files = {
            'file': ('code.rs', open(file_path, 'rb'))
        }

    response = requests.post(url, headers=headers, files=files)

    return response



# .json()['Hash']
# Example usage
# api_key = 'd950c97d.62a441ee89fd4365a0227e3305434e9e'
# file_path = 'file.png'

# upload_response = upload_file(api_key, file_path)

# print(upload_response.text)

# hash=upload_response.json()['Hash']

# print(hash)

# print(get_file(hash))



