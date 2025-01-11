import ChatBox from './components/chatBox'
import SideBar from './components/sideBar'
import { createSession } from './services/api/sessions/createSession.api'
import { useEffect, useState } from 'react'

function App() {
  const [sessionId, setSessionId] = useState<number | null>(null)

  const initiateSession = async () => {
    try {
      const session = await createSession(2)
      setSessionId(session?.id || null)
    } catch (error) {
      console.error('Error creating session:', error)
    }
  }

  useEffect(() => {
    initiateSession()
  }, [])

  return (
    <main className='flex'>
      <SideBar
        sessionId={sessionId}
        setSessionId={setSessionId}
        initiateSession={initiateSession}
      />
      <div className='h-screen w-full px-12 py-10 transition-all duration-300 ease-in-out'>
        <ChatBox sessionId={sessionId} />
      </div>
    </main>
  )
}

export default App
