import { Request, Response } from 'express'
import { prisma } from '@configs/prisma.config'

const deleteAllChatSessions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = parseInt(req.params.userId, 10)

  if (isNaN(userId)) {
    res.status(400).json({ error: 'Invalid user ID' })
    return
  }

  try {
    const deletedSessions = await prisma.chatSession.deleteMany({
      where: {
        userId: userId
      }
    })

    if (deletedSessions.count === 0) {
      res.status(404).json({ error: 'No chat sessions found for the user' })
    } else {
      res.json({
        message: 'All chat sessions deleted successfully',
        count: deletedSessions.count
      })
    }
  } catch {
    res
      .status(500)
      .json({ error: 'An error occurred while deleting chat sessions' })
  }
}

export default deleteAllChatSessions
