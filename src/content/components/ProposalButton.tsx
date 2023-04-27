import React, { useEffect, useLayoutEffect, useState } from 'react'


const ProprosalButton: React.FC = () => {

  const [toggleSlide, setToggleSlide] = useState<boolean>(false)

  function toggleSlider() {
    setToggleSlide(prev => !prev)
  }
  
  useEffect(() => {
    window.postMessage({toggleSlider:toggleSlide})
  }, [toggleSlide])

  useEffect(()=> {
    window.addEventListener("message", (event) => {
      if(event.data.from === "FROM_SLIDER") {
        setToggleSlide(prev => !prev)
      }
    })
  }, [])
  return (
    <button onClick={() => toggleSlider()} className='bg-green-600 py-2 px-4 rounded-lg'>
      Write Proposal
    </button>
  )
}

export default ProprosalButton
