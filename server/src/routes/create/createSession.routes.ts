import { Request, Response } from 'express'
import { prisma } from '@configs/prisma.config'

const createSession = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.body

  if (!userId) {
    res.status(400).json({ error: 'UserId is required' })
    return
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    const newSession = await prisma.chatSession.create({
      data: {
        userId: parseInt(userId, 10)
      }
    })

    res.status(201).json(newSession)
  } catch {
    res.status(500).json({ error: 'Failed to create chat session' })
  }
}

export default createSession
