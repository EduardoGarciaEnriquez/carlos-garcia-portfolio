import { useEffect, useRef, useState } from 'react'

export const useElementOnScreen = () => {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0]
      if (isIntersecting) {
        setShow(true)
        observer.disconnect()
      }
    })

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    // Cleanup on component unmount
    return () => {
      if (currentRef) {
        observer.disconnect()
      }
    }
  }, [ref])

  return { show, ref }
}
