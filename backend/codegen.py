
import os
from openai import OpenAI
from prompt import systemReference
from dotenv import load_dotenv
import re

load_dotenv()
client = OpenAI()



def extractCode(example):
    # Use regular expression to extract code between triple backticks
    code_pattern = re.compile(r'```([\s\S]+?)```')
    matches = code_pattern.findall(example)

    # Concatenate and return the extracted code
    extracted_code = '\n'.join(matches)
    # remove the first line
    extracted_code = extracted_code.split("\n",1)[1]
    return extracted_code

def writeCodeToFile(code, filename):
    with open(filename, 'w') as file:
        file.write(code)




chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": systemReference,
        
        },
        {
            "role": "user",
            "content": "can you write a similar implementation in main.ts for a function that finds the sum of all digits",
        }
    ],
    model="gpt-3.5-turbo",
    temperature=0.001,
)

codeContent=(chat_completion.choices[0].message.content)


Code=(extractCode(codeContent))


writeCodeToFile(code=Code, filename="./stylus-as-example_js/assembly/app.ts")
