import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: '<API_KEY>', // defaults to process.env["OPENAI_API_KEY"]
});

export async function generateContent(message: string) {
    const conversationContext = "You are a helpful assistant that suggest steps to achieving to-dos of a user. Generate 5 steps for this todo:"
    const response = await openai.chat.completions.create({
        messages: [{ role: 'user', content: conversationContext + message }],
        model: 'gpt-3.5-turbo',
        max_tokens: 300
    });
    return response.choices;
}