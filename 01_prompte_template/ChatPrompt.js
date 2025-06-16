import { ChatPromptTemplate } from "@langchain/core/prompts";

const chatMessages = [
  ["system", "You are a {language} Expert"],
  ["user", "{question}"],
];

const chatPrompt = ChatPromptTemplate.fromMessages(chatMessages);

const myprompt = await chatPrompt.invoke({
  language: "Golang",
  question: "How do i handle concurrency",
});
console.log(myprompt.toChatMessages());
