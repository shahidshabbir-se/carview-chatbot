import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export async function openaiChat(prompt: string) {
  try {
    const response = await axios.post(`${API_URL}/api/chat`, { prompt })
    return response.data
  } catch (error: unknown) {
    console.error('Error fetching chat response:', error)

    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.error || 'API request failed' }
    }

    return { error: 'An unknown error occurred' }
  }
}
