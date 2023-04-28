import React, { useEffect, useLayoutEffect, useState } from 'react'


const ProprosalButton: React.FC = () => {
  const [toggleSlide, setToggleSlide] = useState<boolean>(false)

  function toggleSlider() {
    setToggleSlide((prev) => !prev)
  }

  useEffect(() => {
    window.postMessage({ toggleSlider: toggleSlide })
  }, [toggleSlide])

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data.from === 'FROM_SLIDER') {
        setToggleSlide((prev) => !prev)
      }
    })
  }, [])
  return (
    <button onClick={() => toggleSlider()} style={{backgroundColor: "green", padding: "12px 16px", borderRadius: "10px", color: 'white', border: 'transparent', cursor: 'pointer'}}>
      Write Proposal
    </button>
  )
}

export default ProprosalButton
