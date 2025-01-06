import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only use this if you understand the risks
})

export async function openaiChat(prompt: string) {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-4o'
  })
  return chatCompletion
}
