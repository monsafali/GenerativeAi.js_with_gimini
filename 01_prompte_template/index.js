import dotenv from "dotenv";
dotenv.config();

import { PromptTemplate } from "@langchain/core/prompts";
// const templateString = `please provide suggestions on a good pet name for a  {pet_animal} `;
// const petsNamePrompt = PromptTemplate.fromTemplate(templateString);

// const prompte = await petsNamePrompt.format({
//   pet_animal: "dog",
// });

const templateString = "who is the prime minister of the {country}";
const myPrompt = PromptTemplate.fromTemplate(templateString);

// myPrompt.format
console.log(
  await myPrompt.invoke({
    country: "India",
  })
);
