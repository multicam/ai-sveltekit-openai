import OpenAI from "openai";
import { env } from "$env/dynamic/private";
import type { Message } from "$lib/types/chat";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function createChatCompletion(messages: Message[]) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages.map((message) => ({
      content: message.content,
      role: message.role,
    })),
  });

  return completion.choices[0].message;
}

export async function createCompletion(prompt: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message;
}
