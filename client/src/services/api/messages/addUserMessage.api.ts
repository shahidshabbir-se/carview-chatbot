import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

interface UserMessageResponse {
  id: number
  sessionId: number
  sender: 'user'
  content: string
  createdAt: string
  parentId: number | null
}

export const addUserMessage = async (
  sessionId: number,
  content: string
): Promise<UserMessageResponse> => {
  try {
    const response = await axios.post(`${API_URL}/api/add/user-message`, {
      sessionId,
      content
    })
    return response.data
  } catch (error) {
    console.error('Error adding user message:', error)
    throw error
  }
}
