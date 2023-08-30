import { PythonShell } from "python-shell";
import OpenAI from "openai";

const fs = require("fs");
const YAML = require("js-yaml");

// Configuration for OpenAI
const openai = new OpenAI({
    apiKey: process.env.API_KEY
});

// Other model specific config can be modified in the config.yaml
const Config = YAML.load(fs.readFileSync("src/logic/config.yaml"));

// Typescript types
type ChatCompletionMessages = Array<OpenAI.Chat.Completions.CreateChatCompletionRequestMessage>;
type ChatCompletionRole = "function" | "user" | "system" | "assistant";
const USER: ChatCompletionRole = "user" as ChatCompletionRole;
const SYSTEM: ChatCompletionRole = "system" as ChatCompletionRole;

/** 
* This is an older way of calling the openai API, which bundles
* both the context and the user input together in a single prompt.
* You may see a few examples online which use this method.
* @param  {[string]} userInput
* @return {[Promise<string>]} Returns a Promise that returns the output from openai when executed
* @throws Error if openai API encounters an error (e.g. invalid API key).
*/
export async function callOpenAI(messages: ChatCompletionMessages): Promise<string> {
    const response = await openai.chat.completions.create({
        messages,
        model: Config.model,
        temperature: Config.temperature,
        top_p: Config.topP,
        frequency_penalty: Config.frequencyPenalty,
        presence_penalty: Config.presencePenalty,
        max_tokens: Config.maxTokens
    });
    const contentArray = response.choices.map(item => item?.message?.content || "");
    const mergedContent = contentArray.join(' ');
    return mergedContent;
}

/** 
* This function is not currently in use, but included in the code for demonstration purposes.
* This is an older way of calling the openai API, which bundles
* both the context and the user input together in a single prompt.
* Because the context and user input are passed to the LLM model as one,
* Additional care needs to be taken to prevent confusion by the model.
* You may see a few examples online which use this method.
* @param  {[string]} userInput
* @return {[Promise<string>]} Returns a Promise that returns the output from openai when executed
* @throws Error if openai API encounters an error (e.g. invalid API key).
*/
export async function basicCompletion(userInput: string): Promise<string> {
    // Multiple line string is not indented to avoid including it in the string itself
    const fullPrompt = `You are a helpful assistant that suggest steps to achieving to-dos of a user.
Generate 5 simple steps for the following task wrapped in triple quotes:
"""
${userInput}
"""
Steps:`;

    const messages = [{ role: USER, content: fullPrompt }];
    return await callOpenAI(messages);
}

/** 
* This is the newer method of calling the openai API, which separates the context
* from the user input, allowing developers to simplify the prompt and reduce risk
* of adversarial attacks to retrieve the prompt context.
* @param  {[string]} userInput
* @return {[Promise<string>]} Returns a Promise that returns the output from openai when executed
* @throws Error if openai API encounters an error (e.g. invalid API key).
*/
export async function chatCompletion(userInput: string): Promise<string> {
    const messages = [
        { role: SYSTEM, content: Config.systemPrompt },
        { role: USER, content: userInput }
    ];
    return await callOpenAI(messages);
}

/** 
* Calls a python script to get a response.
* This facilitates calling OpenAI using python examples found on the internet.
* If using this function, ensure the API KEY is set in the python script.
* @param  {[string]} userInput
* @return {[Promise<string>]} Returns a Promise that returns the output from python when executed
* @throws Error if python shell encountered an error.
*/
export async function pythonCompletion(userInput: string): Promise<string> {
    // Wrap the python shell in a promise, and `await` the result
    // Reference: https://github.com/extrabacon/python-shell/blob/master/index.ts
    const scriptPath = "src/logic/openai_bridge.py";
    return new Promise<string>((resolve, reject) => {
        const pyshell = new PythonShell(scriptPath, {
            mode: "text",
            pythonOptions: ["-u"]
        });
        
        var payload = {
            "model": Config.model,
            "max_tokens": Config.maxTokens,
            "temperature": Config.temperature,
            "top_p": Config.topP,
            "frequency_penalty": Config.frequencyPenalty,
            "presence_penalty": Config.presencePenalty,
            "system_prompt": Config.systemPrompt,
            "user_input": userInput
        }

        // Send the output via stdin
        pyshell.send(JSON.stringify(payload));

        // Receive output (from stdout) and return it as the result
        let output: string[] = [];
        pyshell.on("message", (message: string) => {
            output.push(message);
        }).end((err: any) => {
            if (err) {
                reject(err);
                return;
            }

            const contentArray = output.map(item => item as string || "");
            const mergedContent: string = contentArray.join(' ') as string;
            resolve(mergedContent);
        });
        // Throw an exception if any error occurred
        pyshell.on("stderr", (err: any) => {
            if (err) {
                console.error(err);
                reject(err);
            }
        });
        pyshell.on("error", (err: any) => {
            if (err) {
                console.error(err);
                reject(err);
            }
        });
        pyshell.on("close", (err: any) => {
            if (err) {
                console.error(err);
                reject(err);
            }
        });
    });
}

/** 
* Wrapper function to handle any exceptions from the inference functions
* @param  {[string]} userInput
* @return {[Promise<string | null>]} Returns a Promise that returns the output as string, or null if errorred out
*/
export async function generateContent(userInput: string): Promise<string | null> {
    try {
        // Set the function as basicCompletion | chatCompletion | pythonCompletion
        // based on your implementation
        return await pythonCompletion(userInput);
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}
