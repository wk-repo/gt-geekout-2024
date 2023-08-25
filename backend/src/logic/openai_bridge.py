import openai

# OpenAI Config
openai.api_key = "<API-KEY>"
MODEL = "gpt-3.5-turbo"


def call_openai_api(input: str) -> str:
    """
    Call OpenAI API and returns output from the API.
    May throw an error if an exception occurred (e.g. invalid API key)
    Reference: https://github.com/openai/openai-cookbook/blob/main/examples/How_to_format_inputs_to_ChatGPT_models.ipynb
    """
    response = openai.ChatCompletion.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": (
                "You are a helpful assistant that suggest steps to achieving to-dos of a user. "
                "Read the following task and generate 5 simple steps to achieve it."
            )},
            {"role": "user", "content": input},
        ],
        # Additional params can be found here:
        # https://platform.openai.com/docs/api-reference/chat/create
        max_tokens=200
    )

    return response['choices'][0]['message']['content']


if __name__ == "__main__":
    # NodeJS will call this script by passing the input as stdin.
    input = input()

    # Use the input
    output = call_openai_api(input)

    # Output to stdout so that nodejs can get the output
    print(output)
