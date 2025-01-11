import { Request, Response } from 'express'
import { prisma } from '@configs/prisma.config'

const addUserMessage = async (req: Request, res: Response): Promise<void> => {
  const { sessionId, content } = req.body

  if (!sessionId || !content) {
    res.status(400).json({ error: 'SessionId and content are required' })
    return
  }

  try {
    const newMessage = await prisma.message.create({
      data: {
        sessionId: parseInt(sessionId, 10),
        content,
        sender: 'user'
      }
    })

    res.status(201).json(newMessage)
  } catch {
    res.status(500).json({ error: 'Failed to send user message' })
  }
}

export default addUserMessage
