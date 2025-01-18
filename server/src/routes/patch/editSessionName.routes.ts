import { Request, Response } from 'express'
import { prisma } from '@configs/prisma.config'

const editSessionName = async (req: Request, res: Response): Promise<void> => {
  const { sessionId, newName } = req.body

  if (!sessionId || !newName) {
    res.status(400).json({ error: 'Session ID and new name are required' })
    return
  }

  try {
    const updatedSession = await prisma.chatSession.update({
      where: { id: sessionId },
      data: { name: newName }
    })

    res.json(updatedSession)
  } catch {
    res.status(404).json({ error: 'Session not found' })
  }
}

export default editSessionName
