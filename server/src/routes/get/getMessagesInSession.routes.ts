import { Request, Response } from 'express'
import { prisma } from '@configs/prisma.config'

const getMessagesInSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { sessionId } = req.params

  if (!sessionId) {
    res.status(400).json({ error: 'SessionId is required' })
    return
  }

  try {
    const messages = await prisma.message.findMany({
      where: {
        sessionId: parseInt(sessionId, 10)
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    res.status(200).json(messages)
  } catch {
    res.status(500).json({ error: 'Failed to fetch messages in session' })
  }
}

export default getMessagesInSession
