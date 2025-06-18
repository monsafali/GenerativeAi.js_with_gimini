import {
  FewShotChatMessagePromptTemplate,
  ChatPromptTemplate,
} from "@langchain/core/prompts";

const exampleMessages = [
  { input: "Who is the US President", output: "Donald Trump" },
  { input: "What is the capital of the U.S", output: "Washington D.C" },
  {
    input: "Who is the presidenet candiate of the Democrate Party",
    output: "Kamala Harris",
  },
];

const examplePromptTemplete = ChatPromptTemplate.fromMessages([
  ["human", "{input}"],
  ["ai", "{output}"],
]);

const myFewShotPrompt = new FewShotChatMessagePromptTemplate({
  examplePrompt: examplePromptTemplete,
  examples: exampleMessages,
  inputVariables: [],
});

// console.log(await myFewShotPrompt.invoke());

const actualPrompt = ChatPromptTemplate.fromMessages([
  ["system", "your are an expert in U.S Plitics"],
  myFewShotPrompt,
  ["user", "{new_question}"],
]);

const prompt = await actualPrompt.format({
  new_question: "Who is the current vice President of the U.S",
});

console.log(prompt);
