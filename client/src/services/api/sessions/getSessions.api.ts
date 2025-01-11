import axios, { AxiosResponse } from 'axios'

interface Message {
  id: number
  sessionId: number
  sender: string
  content: string
  parentId: number | null
  createdAt: string
}

interface GetSessionsProps {
  id: number
  userId: number
  createdAt: string
  messages: Message[]
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const getSessions = async (
  userId: number
): Promise<GetSessionsProps[]> => {
  // Updated return type to array
  try {
    const response: AxiosResponse<GetSessionsProps[]> = await axios.get(
      `${API_URL}/api/get/${userId}/all-sessions`
    )
    console.log(response.data)
    return response.data // Return an array of sessions
  } catch (error: any) {
    console.error(
      'Error fetching sessions:',
      error.response ? error.response.data : error.message
    )
    return [] // Return empty array on error
  }
}
