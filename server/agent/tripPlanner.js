import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';
import dotenv from 'dotenv';
dotenv.config(); // This
const llm = new ChatOpenAI({
  modelName: 'gpt-3.5-turbo-1106',
  temperature: 0.7,
  apiKey: process.env.OPEN_API_KEY,
});
console.log("key",process.env.OPEN_API_KEY)
export async function planTrip(prompt) {
  try {
    const message = new HumanMessage(prompt);
    const response = await llm.invoke([message]); 
    return response.content;
  } catch (error) {
    console.error('Error planning trip:', error);
    throw error;
  }
}
