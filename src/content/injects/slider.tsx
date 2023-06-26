import ReactDOM from 'react-dom/client'
import Slider from '../components/core/Slider'
import Proposal from '../components/Proposal'
import { toggleSlider } from '../../util'
import { RecoilRoot } from 'recoil'
let root = '' as any

let linkElement = document.createElement('link')
linkElement.rel = 'stylesheet'
linkElement.type = 'text/css'
linkElement.href = chrome.runtime.getURL('/src/styles/output.css')
// Attaching Slider component to shadowDOM
let rootElement = document.createElement('div')
rootElement.id = 'root-id'
document.body.prepend(rootElement)
const shadowDOM = rootElement.attachShadow({ mode: 'open' })

shadowDOM.append(linkElement)

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
