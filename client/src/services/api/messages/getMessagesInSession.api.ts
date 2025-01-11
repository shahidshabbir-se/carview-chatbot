import axios from 'axios'

interface Message {
  id: number
  sessionId: number
  sender: string
  content: string
  createdAt: string
  parentId: number | null
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const getMessagesInSession = async (
  sessionId: number
): Promise<Message[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/get/messages/${sessionId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching messages in session:', error)
    throw new Error('Failed to fetch messages in session.')
  }
}
