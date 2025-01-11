import { Router } from 'express'
import addChatbotResponse from './add/addChatbotResponse.routes'
import addUserMessage from './add/addUserMessage.routes'
import createSession from './create/createSession.routes'
import deleteChatSession from './del/deleteChatSession.routes'
import getAllSessionsForUser from './get/getAllSessionsForUser.routes'
import getMessagesInSession from './get/getMessagesInSession.routes'

const router = Router()
router.post('/add/chatbot-response', addChatbotResponse)
router.post('/add/user-message', addUserMessage)
router.post('/create/session', createSession)
router.use('/del/chat-session', deleteChatSession)
router.get('/get/:userId/all-sessions', getAllSessionsForUser)
router.get('/get/messages/:sessionId', getMessagesInSession)

export default router
