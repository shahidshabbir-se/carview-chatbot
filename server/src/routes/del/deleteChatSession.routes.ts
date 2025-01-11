import { Request, Response } from 'express'
import { prisma } from '@configs/prisma.config' // Assuming you have this configured

const deleteChatSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  const sessionId = parseInt(req.params.sessionId, 10) // Assuming sessionId is in the URL params

  if (isNaN(sessionId)) {
    res.status(400).json({ error: 'Invalid sessionId' })
    return
  }

  try {
    const deletedSession = await prisma.chatSession.delete({
      where: {
        id: sessionId
      }
    })

    res.json(deletedSession) // Return the deleted session as a response
  } catch {
    res.status(404).json({ error: 'Session not found' }) // 404 if session doesn't exist
  }
}

export default deleteChatSession
