import ReactDOM from 'react-dom/client'
import { config } from '../../util/config'
import ClientMessage from '../components/ClientMessage'
import { toggleSlider } from '../../util'
import Slider from '../components/Slider'

let root = '' as any

if (window.location.href.startsWith(config.upwork_msg_url)) {
  const targetNode = document.querySelector('#layout-room')
  const config = { attributes: true, childList: true, subtree: true }
  const observer = new MutationObserver(callback)
  function callback() {
    if (!document.querySelector('#gpt-upwork-msg')) {
      let img = document.createElement('img')
      img.id = 'gpt-upwork-msg'
      // @ts-ignore
      img.style = `
height: 18px;
width: 18px;
cursor: pointer;
margin-right: 8px;
      `
      img.src = chrome.runtime.getURL('/img/enacton.png')
      document.querySelector('.editor-tools')?.insertAdjacentElement('afterend', img)
      img.addEventListener('click', () => {
        const element = toggleSlider('message-proposal')
        setTimeout(() => {
          if (root == '') {
            root = ReactDOM.createRoot(element)
          }

          root.render(
            <Slider title="Generate Answer" sliderId="message-proposal">
              <ClientMessage />
            </Slider>,
          )
        }, 100)
      })
    }
  }
  if (targetNode) observer.observe(targetNode, config)
}
