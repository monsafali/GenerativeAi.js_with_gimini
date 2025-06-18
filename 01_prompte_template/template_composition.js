import {
  PromptTemplate,
  PipelinePromptTemplate,
} from "@langchain/core/prompts";

import dotenv from "dotenv";
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
});

const personalityPrompt = PromptTemplate.fromTemplate(
  "You're a witty and helpful AI assistant."
);

const topicPrompt = PromptTemplate.fromTemplate(
  "I'm interested in learning about {example_topic}. Can you give me a brief overview?\n"
);

const overviewPrompt = PromptTemplate.fromTemplate(
  "Sure, here's a quick overview of {example_topic}: {example_overview}"
);

const questionPrompt = PromptTemplate.fromTemplate(`
  {personality}
  {example_question}
  {example_answer}
  Now, can you tell me about the history of {new_topic}?
`);

const composedPrompt = new PipelinePromptTemplate({
  finalPrompt: questionPrompt,
  pipelinePrompts: [
    {
      name: "personality",
      prompt: personalityPrompt,
    },
    {
      name: "example_question",
      prompt: topicPrompt,
    },
    {
      name: "example_answer",
      prompt: overviewPrompt,
    },
  ],
});

const prompt = await composedPrompt.format;

const chain = composedPrompt.pipe(geminiModel);

const respone = await chain.invoke({
  example_topic: "Quantum Physics",
  example_overview: "It's the study of the very small, where things get weird.",
  new_topic: "String theory",
});
console.log(respone.content);
// ...existing code...
