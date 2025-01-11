import { Request, Response } from 'express'
import { prisma } from '@configs/prisma.config'

const addChatbotResponse = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { sessionId, content, parentId } = req.body

  if (!sessionId || !content || !parentId) {
    res
      .status(400)
      .json({ error: 'SessionId, content, and parentId are required' })
    return
  }

  try {
    const response = await prisma.message.create({
      data: {
        sessionId: parseInt(sessionId, 10),
        content,
        parentId: parseInt(parentId, 10),
        sender: 'chatbot'
      }
    })

    res.status(201).json(response)
  } catch {
    res.status(500).json({ error: 'Failed to add chatbot response' })
  }
}

export default addChatbotResponse
