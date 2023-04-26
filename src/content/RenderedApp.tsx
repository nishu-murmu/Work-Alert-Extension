import Slider from './components/Slider'
import { toggleSliderState } from './atom'
import { useRecoilState } from 'recoil'

import ProprosalButton from './components/ProposalButton'

const RenderedApp = () => {
  const [toggleSlider, setToggleSlider] = useRecoilState(toggleSliderState)

  return (
    <div className="flex">
      {/* <ProprosalButton/> */}
      {/* {toggleSlider && <Slider />} */}
      <Slider />
    </div>
  )
}

export default RenderedApp
