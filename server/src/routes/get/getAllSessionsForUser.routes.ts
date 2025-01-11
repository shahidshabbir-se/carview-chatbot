import { Request, Response } from 'express'
import { prisma } from '@configs/prisma.config'

const getAllSessionsForUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = parseInt(req.params.userId, 10)

  if (isNaN(userId)) {
    res.status(400).json({ error: 'Invalid userId' })
    return
  }

  try {
    // Fetch sessions and their messages, including both user and chatbot messages (with AI response)
    const sessions = await prisma.chatSession.findMany({
      where: {
        userId: userId
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    })

    // Filter sessions where the first message has a corresponding chatbot (child) message
    const filteredSessions = sessions.filter((session) => {
      const firstMessage = session.messages[0]
      const chatbotMessages = session.messages.filter(
        (message) => message.parentId === firstMessage.id
      )

      // Ensure the first message has a child (chatbot's AI-generated message)
      return chatbotMessages.length > 0
    })

    if (filteredSessions.length === 0) {
      res.status(404).json({
        error: `No sessions found for userId: ${userId} with AI-generated response`
      })
      return
    }

    res.status(200).json(filteredSessions)
  } catch {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default getAllSessionsForUser
