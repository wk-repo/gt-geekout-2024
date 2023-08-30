import os 
import json
import openai
from dotenv import load_dotenv

load_dotenv()

# OpenAI Config
openai.api_key = os.getenv("API_KEY")
MODEL = "gpt-3.5-turbo"


def call_openai_api(payload: dict) -> str:
    """
    Call OpenAI API and returns output from the API.
    May throw an error if an exception occurred (e.g. invalid API key)
    Reference: https://github.com/openai/openai-cookbook/blob/main/examples/How_to_format_inputs_to_ChatGPT_models.ipynb
    """
    response = openai.ChatCompletion.create(
        model=payload["model"],
        messages=[
            {"role": "system", "content": payload["system_prompt"]},
            {"role": "user", "content": payload["user_input"]},
        ],
        temperature=payload["temperature"],
        top_p=payload["top_p"],
        frequency_penalty=payload["frequency_penalty"],
        presence_penalty=payload["presence_penalty"],
        max_tokens=payload["max_tokens"]
    )

    return response['choices'][0]['message']['content']


if __name__ == "__main__":
    # NodeJS will call this script and pass the input as stdin.
    input = input()

    # Use the input
    output = call_openai_api(json.loads(input))

    # Output to stdout so that nodejs can get the output
    print(output)
