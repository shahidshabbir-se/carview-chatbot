import axios, { AxiosResponse } from 'axios'

interface CreateSessionResponse {
  id: number
  userId: number
  createdAt: string
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const createSession = async (
  userId: number
): Promise<CreateSessionResponse | void> => {
  try {
    const response: AxiosResponse<CreateSessionResponse> = await axios.post(
      `${API_URL}/api/create/session`,
      { userId }
    )

    console.log('Session created successfully:', response.data)
    return response.data
  } catch (error) {
    console.error(
      'Error creating session:',
      error.response ? error.response.data : error.message
    )
  }
}
