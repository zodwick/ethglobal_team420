import os
from openai import OpenAI
from prompt import systemReference
from dotenv import load_dotenv
import re

load_dotenv()
client = OpenAI()


def extract(prompt):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "extract the key details about the output of the Chain and the smart contract from the prompt as a json.all key value pairs should be string",

            },
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="gpt-3.5-turbo-1106",
        temperature=0.001,
        response_format={"type": "json_object"},

    )
    content = (chat_completion.choices[0].message.content)

    return content

