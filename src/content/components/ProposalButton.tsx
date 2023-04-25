import React from 'react'
import { toggleSliderState } from '../atom'
import { useRecoilState } from 'recoil'

const ProprosalButton: React.FC = () => {
  const [toggleSlider, setToggleSlider] = useRecoilState(toggleSliderState)

  const toggleHandler = () => {
    const customScriptElement = document.querySelector('.custom-script')
    setToggleSlider((prevState) => !prevState)
  }

  return (
    <button onClick={() => toggleHandler()} className='bg-green-600 py-2 px-4 rounded-lg'>
      Write Proposal
    </button>
  )
}

export default ProprosalButton
