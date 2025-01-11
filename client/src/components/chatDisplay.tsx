import React, { useEffect, useRef, useState } from 'react'
import Typed from 'typed.js'
import { marked } from 'marked'
import { getMessagesInSession } from '../services/api/messages/getMessagesInSession.api'
import EmptyChatDisplay from './emptyChatDisplay'

interface ChatDisplayProps {
  prompt: string
  response: string
  className?: string
  showEmptyDisplay: boolean
  setShowEmptyDisplay: React.Dispatch<React.SetStateAction<boolean>>
  sessionId: number | null
}

interface Message {
  id: number
  sessionId: number
  sender: string
  content: string
  createdAt: string
  parentId: number | null
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({
  prompt,
  response,
  className,
  showEmptyDisplay,
  setShowEmptyDisplay,
  sessionId
}) => {
  const typedRef = useRef<HTMLDivElement | null>(null)
  const messagesContainerRef = useRef<HTMLDivElement | null>(null)
  const [htmlResponse, setHtmlResponse] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const convertMarkdownToHTML = async (markdown: string): Promise<string> => {
    return marked(markdown)
  }

  useEffect(() => {
    const fetchMessages = async () => {
      if (!sessionId) return
      try {
        const messagesData = await getMessagesInSession(sessionId)
        if (messagesData?.length === 0) {
          setShowEmptyDisplay(true)
        } else {
          setShowEmptyDisplay(false)
        }
        setMessages(messagesData)
      } catch (error) {
        console.error('Error fetching messages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [sessionId])

  useEffect(() => {
    const fetchHTMLResponse = async () => {
      if (response) {
        const htmlContent = await convertMarkdownToHTML(response)
        setHtmlResponse(htmlContent)
      }
    }
    fetchHTMLResponse()
  }, [response])

  useEffect(() => {
    if (typedRef.current && htmlResponse) {
      const typed = new Typed(typedRef.current, {
        strings: [htmlResponse],
        typeSpeed: 0,
        backSpeed: 0,
        backDelay: 1000,
        startDelay: 500,
        showCursor: false,
        contentType: 'html'
      })

      return () => typed.destroy()
    }
  }, [htmlResponse])

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight
    }
  }, [messages, htmlResponse])

  const groupMessages = (messages: Message[]) => {
    const pairs: { prompt: Message; response: Message }[] = []

    for (let i = 0; i < messages.length - 1; i++) {
      const prompt = messages[i]
      const response = messages[i + 1]

      if (prompt.sender === 'user' && response.sender === 'chatbot') {
        pairs.push({ prompt, response })
        i++
      }
    }

    return pairs
  }

  return (
    <div
      className={`h-full w-full overflow-y-scroll rounded-[10px] bg-white p-8 shadow-xs ${className}`}
      ref={messagesContainerRef}
    >
      <div className='h-full'>
        {loading ? (
          <div>Loading messages...</div>
        ) : showEmptyDisplay ? (
          <EmptyChatDisplay />
        ) : (
          <div className='h-full'>
            {groupMessages(messages).map(({ prompt, response }) => (
              <div key={prompt.id} className='mb-6'>
                <div className='flex justify-end gap-3'>
                  <p className='h-min rounded-full bg-gray-100 p-3'>
                    {prompt.content}
                  </p>
                  <img className='h-8 w-8' src='/img/avatar.svg' alt='User' />
                </div>
                <div className='mt-4 flex justify-start gap-3'>
                  <img
                    className='h-6 w-6'
                    src='/img/chatbot.svg'
                    alt='Chatbot'
                  />
                  <p
                    className='text-para font-normal'
                    dangerouslySetInnerHTML={{
                      __html: marked(response.content)
                    }}
                  />
                </div>
              </div>
            ))}
            <div className='flex justify-end gap-3'>
              {prompt && (
                <h1 className='h-min rounded-full bg-gray-100 p-3'>{prompt}</h1>
              )}
              <img className='h-8 w-8' src='/img/avatar.svg' alt='Avatar' />
            </div>
            <div className='mt-4 flex justify-start gap-3 pb-8'>
              <img className='h-6 w-6' src='/img/chatbot.svg' alt='Chatbot' />
              <p className='text-para font-normal'>
                {htmlResponse ? <div ref={typedRef}></div> : ''}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatDisplay
