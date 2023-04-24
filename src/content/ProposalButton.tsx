import React from 'react'
import { toggleSliderState } from './atom'
import { useRecoilState } from 'recoil'

const ProprosalButton: React.FC = () => {
  const [toggleSlider, setToggleSlider] = useRecoilState(toggleSliderState)

  const toggleHandler = () => {
    const customScriptElement = document.querySelector('.custom-script')
    console.log('check clicked')
    setToggleSlider((prevState) => !prevState)
    console.log(toggleSlider, 'state')
  }

  return (
    <button onClick={() => toggleHandler()} className='bg-green-600 py-2 px-4 rounded-lg'>
      Write Proposal
    </button>
  )
}

export default ProprosalButton
