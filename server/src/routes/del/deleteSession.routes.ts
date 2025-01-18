import { Request, Response } from 'express'
import { prisma } from '@configs/prisma.config'

const deleteSession = async (req: Request, res: Response): Promise<void> => {
  const sessionId = parseInt(req.params.sessionId, 10)

  if (isNaN(sessionId)) {
    res.status(400).json({ error: 'Invalid session ID' })
    return
  }

  try {
    const deletedSession = await prisma.chatSession.delete({
      where: { id: sessionId }
    })

    res.json(deletedSession)
  } catch {
    res.status(404).json({ error: 'Session not found' })
  }
}

export default deleteSession
