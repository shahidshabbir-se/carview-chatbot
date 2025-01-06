import { useState } from 'react'
import ChatDisplay from './chatDisplay'
import { openaiChat } from '../services/api/openai.api'

const ChatBox = () => {
  const [prompt, setPrompt] = useState<string>('')
  const [submittedPrompt, setSubmittedPrompt] = useState<string>('')
  const [response, setResponse] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittedPrompt(prompt)
    setResponse('Assistant is thinking...')

    try {
      const assistantResponse = await openaiChat(prompt)
      console.log(assistantResponse)
      setResponse(
        assistantResponse?.choices[0]?.message?.content || 'No response'
      )
    } catch {
      setResponse('Error: Could not fetch response.')
    }

    setPrompt('')
  }

  return (
    <div className='flex h-full flex-col items-center justify-center gap-7'>
      <ChatDisplay
        prompt={submittedPrompt}
        response={response}
        className='flex-grow'
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
          <img src='/img/submit.svg' alt='Submit' />
        </button>
      </form>
    </div>
  )
}

export default ChatBox
