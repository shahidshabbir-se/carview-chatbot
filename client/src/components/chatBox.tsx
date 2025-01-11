import { useState } from 'react'
import ChatDisplay from './chatDisplay'
import { openaiChat } from '../services/api/openai.api'
import { addUserMessage } from '../services/api/messages/addUserMessage.api'
import { addChatbotResponse } from '../services/api/messages/addChatbotResponse.api'

const ChatBox = ({ sessionId }: { sessionId: number | null }) => {
  const [prompt, setPrompt] = useState<string>('')
  const [submittedPrompt, setSubmittedPrompt] = useState<string>('')
  const [response, setResponse] = useState<string>('')
  const [showEmptyDisplay, setShowEmptyDisplay] = useState<boolean>(true)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    setShowEmptyDisplay(false)
    if (!sessionId) return
    e.preventDefault()
    setSubmittedPrompt(prompt)
    setResponse('Assistant is thinking...')

    try {
      const userMessageResponse = await addUserMessage(sessionId, prompt)
      setPrompt('')

      if (userMessageResponse?.id) {
        const assistantResponse = await openaiChat(prompt)

        if (
          userMessageResponse.id &&
          assistantResponse?.choices?.[0]?.message?.content
        ) {
          await addChatbotResponse(
            sessionId,
            assistantResponse.choices[0].message.content,
            userMessageResponse.id
          )
          setResponse(assistantResponse.choices[0].message.content)
        } else {
          setResponse('Error: Assistant did not provide a valid response.')
        }
      } else {
        setResponse('Error: Could not send user message.')
      }
    } catch (error) {
      console.error(error)
      setResponse('Error: Could not fetch response.')
    }
  }

  return (
    <div className='h-full flex-col gap-7 center-flex'>
      <ChatDisplay
        prompt={submittedPrompt}
        response={response}
        className='flex-grow'
        showEmptyDisplay={showEmptyDisplay}
        setShowEmptyDisplay={setShowEmptyDisplay}
        sessionId={sessionId}
      />
      <form
        onSubmit={handleSubmit}
        className='flex w-full rounded-xl bg-white p-1 px-5 shadow-xs'
      >
        <input
          type='text'
          value={prompt}
          onChange={handleInputChange}
          placeholder='🧠 What’s on your mind?...'
          className='w-full outline-none'
        />
        <button type='submit' className='mt-1 size-12'>
          <img src='/img/submit.png' alt='Submit' />
        </button>
      </form>
    </div>
  )
}

export default ChatBox
