import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const addChatbotResponse = async (
  sessionId: number,
  content: string,
  parentId: number
) => {
  try {
    const response = await axios.post(`${API_URL}/api/add/chatbot-response`, {
      sessionId,
      content,
      parentId
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('Error adding user message:', error)
    throw error
  }
}
