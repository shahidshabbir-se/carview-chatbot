import React, { useEffect, useRef, useState } from 'react'
import Typed from 'typed.js'
import { marked } from 'marked'

interface ChatDisplayProps {
  prompt: string
  response: string
  className?: string
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({
  prompt,
  response,
  className
}) => {
  const typedRef = useRef<HTMLDivElement | null>(null)
  const [htmlResponse, setHtmlResponse] = useState<string>('')

  const convertMarkdownToHTML = async (markdown: string): Promise<string> => {
    return marked(markdown)
  }

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

  return (
    <div
      className={`overflow-t-scroll w-full rounded-[10px] bg-white p-8 shadow-xs ${className}`}
    >
      <div className='flex justify-end gap-3'>
        {prompt && (
          <h1 className='h-min rounded-full bg-gray-100 p-3'>{prompt}</h1>
        )}
        <img className='h-8 w-8' src='/img/avatar.svg' alt='Avatar' />
      </div>
      <div className='mt-4 flex justify-start gap-3'>
        <img className='h-6 w-6' src='/img/chatbot.svg' alt='Chatbot' />
        <p className='text-para font-normal'>
          {htmlResponse ? (
            <div ref={typedRef}></div>
          ) : (
            'Assistant is thinking...'
          )}
        </p>
      </div>
    </div>
  )
}

export default ChatDisplay
