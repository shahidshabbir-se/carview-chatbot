import { useEffect, useRef } from 'react'

export const useOutsideClick = (
  callback: () => void,
  inputRef: React.RefObject<HTMLInputElement> // Add ref for input
) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !(inputRef.current && inputRef.current.contains(event.target as Node))
      ) {
        callback()
      }
    }

    document.addEventListener('mouseup', handleClickOutside)
    document.addEventListener('touchend', handleClickOutside)

    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
      document.removeEventListener('touchend', handleClickOutside)
    }
  }, [callback, inputRef])

  return ref
}
