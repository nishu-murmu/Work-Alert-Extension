import ReactDOM from 'react-dom/client'
import Slider from '../components/core/Slider'
import Proposal from '../components/Proposal'
import { toggleSlider } from '../../util'
import { RecoilRoot } from 'recoil'
let root = '' as any

const element = toggleSlider('proposal-slider')

setTimeout(() => {
  if (root == '') {
    root = ReactDOM.createRoot(element)
  }

  root.render(
    <RecoilRoot>
      <Slider title="Write Proposal" sliderId="proposal-slider">
        <Proposal />
      </Slider>
    </RecoilRoot>,
  )
}, 100)
