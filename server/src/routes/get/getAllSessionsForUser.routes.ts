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

    const filteredSessions = sessions.filter((session) => {
      const firstMessage = session.messages[0]
      if (!firstMessage) return false

      const hasChatbotResponse = session.messages.some(
        (message) => message.parentId === firstMessage.id
      )

      return hasChatbotResponse
    })

    if (filteredSessions.length === 0) {
      res.status(404).json({
        error: `No sessions found for userId: ${userId} with AI-generated response`
      })
      return
    }

    const response = filteredSessions
      .map((session) => ({
        id: session.id,
        name: session.name ?? '' // Use a fallback for null names
      }))
      .sort((a, b) => b.name.localeCompare(a.name || ''))

    res.status(200).json(response)
  } catch {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default getAllSessionsForUser
