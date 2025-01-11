import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

const EmptyChatDisplay = () => {
  const typedElement = useRef(null)

  useEffect(() => {
    const options = {
      strings: [
        'What can I help with?',
        'Ask me anything!',
        "Let's get started!"
      ],
      typeSpeed: 50,
      backSpeed: 50,
      showCursor: false,
      backDelay: 1000,
      loop: true
    }

    const typed = new Typed(typedElement.current, options)

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <div className='h-full text-heading-2-sm text-blue-500 center-flex'>
      <span ref={typedElement}></span>
    </div>
  )
}

export default EmptyChatDisplay
