import { useState, useLayoutEffect } from 'react'
import Slider from './Slider'

const RenderedApp = () => {
  const [toggleSlide, setToggleSlide] = useState<boolean>(false)

  useLayoutEffect(() => {
    window.addEventListener('message', (event) => {
      setToggleSlide(event?.data?.toggleSlider)
    })
  }, [])

  return (
    <div className="flex z-[9999999] relative">
      {/* @ts-ignore */}
      <Slider toggleSlider={toggleSlide} />
    </div>
  )
}

export default RenderedApp
