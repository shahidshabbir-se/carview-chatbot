import { useEffect, useState } from 'react'
import { getSessions } from '../services/api/sessions/getSessions.api'

interface SideBarProps {
  sessionId: number | null
  setSessionId: React.Dispatch<React.SetStateAction<number | null>>
  initiateSession: () => Promise<void>
}

interface Message {
  id: number
  sessionId: number
  sender: string
  content: string
  parentId: number | null
  createdAt: string
}

interface Sessions {
  id: number
  userId: number
  createdAt: string
  messages: Message[]
}

const SideBar: React.FC<SideBarProps> = ({
  sessionId,
  setSessionId,
  initiateSession
}) => {
  const [sessions, setSessions] = useState<Sessions[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [showSearch, setShowSearch] = useState<boolean>(false)

  useEffect(() => {
    const fetchSession = async () => {
      const result = await getSessions(1)
      if (result) {
        setSessions(result) // assuming result contains an array of sessions
      } else {
        console.error('No sessions returned or an error occurred')
      }
    }

    fetchSession()
  }, [sessionId])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase())
  }

  const filteredSessions = sessions.filter((session) => {
    const firstMessage = session.messages[0]
    if (firstMessage) {
      return firstMessage.content.toLowerCase().includes(searchQuery)
    }
    return false
  })

  return (
    <div>
      <div className='h-[calc(100vh-55px)] w-0 transform overflow-x-hidden rounded-ee-2xl bg-white transition-all duration-300 ease-in-out sm:w-[75px] lg:w-[300px]'>
        <div className='flex-col gap-2 py-5 center-flex lg:flex-row lg:px-5'>
          <button
            onClick={() => initiateSession()}
            className='h-[50px] w-[50px] gap-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 text-white center-flex lg:w-auto lg:flex-grow'
          >
            <img src='/img/add.svg' alt='' />
            <span className='hidden lg:flex'>New Chat</span>
          </button>
          <button
            onClick={() => setShowSearch(true)}
            className='size-[50px] gap-2 rounded-full bg-purple-300 text-white center-flex'
          >
            <img src='/img/search.svg' alt='' />
          </button>
        </div>

        <div className='hidden items-center justify-between border-y border-[#EFEFEF] p-5 py-5 text-xs text-gray-500 lg:flex'>
          <p>Your conversations</p>
          <button className='text-para-base font-semibold leading-5 text-[#5661F6]'>
            Clear All
          </button>
        </div>

        {/* Sessions List */}
        <div className='space-y-2 p-2.5'>
          {filteredSessions.map((session) => {
            // Get the first message of the session
            const firstMessage = session.messages[0]
            return (
              <div
                key={session.id}
                onClick={() => setSessionId(session.id)} // Fix here
                className='group relative size-[50px] cursor-pointer rounded-full border border-blue-400 bg-blue-50 text-blue-600 center-flex lg:h-[54px] lg:w-auto lg:space-x-2 lg:rounded-l-full lg:rounded-r-none lg:p-2.5'
              >
                <img
                  className='sm:hidden lg:block'
                  src='/img/message.svg'
                  alt=''
                />
                <p className='truncate sm:w-[18px] sm:overflow-ellipsis sm:whitespace-nowrap lg:w-full'>
                  {firstMessage ? firstMessage.content : 'No messages yet'}
                </p>
                <div className='absolute -right-[131px] hidden h-[54px] w-[120px] cursor-default items-center justify-start gap-2 rounded-l-full bg-blue-300 pl-5 transition-all group-hover:-right-[11px] lg:flex'>
                  <button>
                    <img src='/img/delete.svg' className='size-6' alt='' />
                  </button>
                  <button>
                    <img src='/img/edit.svg' className='size-6' alt='' />
                  </button>
                  <div className='ml-2 size-[56px] rotate-180 rounded-r-full bg-gray-100'></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {showSearch && (
        <div
          onClick={() => setShowSearch(false)}
          className='fixed top-0 z-[100] h-screen w-screen bg-gray-400/65 center-flex'
        >
          <input
            type='text'
            placeholder='Search chats...'
            className='w-[30vw] rounded-lg border border-gray-300 p-2.5 outline-none'
            value={searchQuery}
            onChange={handleSearchChange}
            onClick={(e) => e.stopPropagation()} // Prevent parent onClick
          />
        </div>
      )}
    </div>
  )
}

export default SideBar
