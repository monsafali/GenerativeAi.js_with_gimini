import dotenv from "dotenv";
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  apiKey: process.env.GOOGLE_API_KEY,
  // temperature: 0.8,
  // maxOutputTokens: 30,
});

const prompte =
  "write a short story about a rebot who discovers the meaning of life";
const respone = await model.invoke(prompte);
// console.log(respone.content);

// const streamRespone = await model.stream(prompte);
// for await (const token of streamRespone) {
//   process.stdout.write(token.content);
// }

console.log(`Prompte token ${respone.usage_metadata.input_tokens}`);
console.log(`responsee token ${respone.usage_metadata.output_tokens}`);
console.log(`total  token ${respone.usage_metadata.total_tokens}`);
