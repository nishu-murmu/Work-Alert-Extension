import React, { useEffect, useState } from 'react'


const ProprosalButton: React.FC = () => {

  const [toggleSlide, setToggleSlide] = useState<boolean>(false)

  function toggleSlider() {
    setToggleSlide(prev => !prev)
  }
  
  useEffect(() => {
    window.postMessage({toggleSlider:toggleSlide}, 'https://www.upwork.com/*')
  }, [toggleSlide])
  return (
    <button onClick={() => toggleSlider()} className='bg-green-600 py-2 px-4 rounded-lg'>
      Write Proposal
    </button>
  )
}

export default ProprosalButton
