import React, { useEffect, useState } from 'react'

const BackToTop = () => {
  // state to display toggler
  const [isVisible, setIsVisible] = useState(false)

  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const listenToScroll = () => {
    const heightToHidden = 20
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop

    if (winScroll > heightToHidden) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll)
    return () => window.removeEventListener('scroll', listenToScroll)
  }, [])

  return (
    <div
      onClick={goToBtn}
      onKeyDown={goToBtn}
      role="button"
      tabIndex={0}
      className={`fixed bg-green-500 animate-bounce cursor-pointer  rounded-full p-3 right-12 bottom-12 ${
        !isVisible ? 'hidden' : 'backToTop'
      }`}
    >
      {isVisible && (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
            />
          </svg>
        </div>
      )}
    </div>
  )
}

export default BackToTop
