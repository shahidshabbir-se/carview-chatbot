import { OpenAI } from 'openai'
import { Request, Response } from 'express'

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

const generateChatResponse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt } = req.body

    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' })
      return
    }

    const chatCompletion = await openaiClient.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4o',
    })

    res.json(chatCompletion)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error generating chat response:', error.message)
      res.status(500).json({ error: error.message })
    } else {
      console.error('An unknown error occurred:', error)
      res.status(500).json({ error: 'An unknown error occurred' })
    }
  }
}

export default generateChatResponse
