import { Router } from 'express'
import addChatbotResponse from './add/addChatbotResponse.routes'
import addUserMessage from './add/addUserMessage.routes'
import createSession from './create/createSession.routes'
import deleteSession from './del/deleteSession.routes'
import getAllSessionsForUser from './get/getAllSessionsForUser.routes'
import getMessagesInSession from './get/getMessagesInSession.routes'
import deleteAllChatSessions from './del/delAllChatSessions.routes'
import editSessionName from './patch/editSessionName.routes'

const router = Router()
router.post('/add/chatbot-response', addChatbotResponse)
router.post('/add/user-message', addUserMessage)
router.post('/create/session', createSession)
router.delete('/del/session/:sessionId', deleteSession) // Add the delete route
router.get('/get/:userId/all-sessions', getAllSessionsForUser)
router.get('/get/messages/:sessionId', getMessagesInSession)
router.delete('/del/all-sessions/:userId', deleteAllChatSessions)
router.patch('/edit/session', editSessionName)

export default router
