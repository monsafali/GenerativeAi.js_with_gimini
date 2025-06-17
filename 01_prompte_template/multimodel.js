import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

import dotenv from "dotenv";
dotenv.config();

import { readFile } from "fs/promises";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
});

const imageDetail = await readFile("./images.jpeg");
const base64Image1 = imageDetail.toString("base64");
const imageDetail2 = await readFile("./images2.jpg");
const base64Image2 = imageDetail2.toString("base64");

const imagePrompt = ChatPromptTemplate.fromMessages([
  ["system", "Tell me about the items in the image(s) "],
  [
    "user",
    [
      {
        type: "image_url",
        image_url: "data:image/jpeg;base64,{base64_image_1}",
      },
      {
        type: "image_url",
        image_url: "data:image/jpeg;base64,{base64_image_2}",
      },
    ],
  ],
]);

const chain = imagePrompt.pipe(geminiModel);
const response = await chain.invoke({
  base64_image_1: base64Image1,
  base64_image_2: base64Image2,
});
console.log(response.content);
