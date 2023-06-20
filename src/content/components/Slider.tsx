import React from 'react'
import { CrossIcon } from '../../util/Icons'
import { toggleSlider } from '../../util'

const Slider = ({
  children,
  title,
  sliderId,
}: {
  children: React.ReactNode
  title: string
  sliderId?: string | undefined
}) => {
  function closeSlider() {
    if (sliderId) {
      toggleSlider(sliderId)
    } else {
      toggleSlider()
    }
  }

  return (
    <div className={`right-2 fixed z-[9999] px-4 py-2 h-screen w-2/6 bg-black text-white`}>
      <div className="header-section flex w-full ">
        <button onClick={() => closeSlider()}>
          <CrossIcon className="h-8 w-8 my-2 mx-3" strokeColor="green" />
        </button>
        <div className="text-2xl w-full my-4 text-center text-green-600 font-extrabold">
          {title}
        </div>
      </div>

      <div className="main-section">{children}</div>
    </div>
  )
}

export default Slider
