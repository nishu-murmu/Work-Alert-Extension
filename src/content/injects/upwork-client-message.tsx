import ReactDOM from 'react-dom/client'
import { config } from '../../util/config'
import UpworkClientMsg from '../components/UpworkClientMsg'

if (window.location.href.startsWith(config.upwork_msg_url)) {
  const targetNode = document.querySelector('#layout-room')
  const config = { attributes: true, childList: true, subtree: true }
  const observer = new MutationObserver(callback)
  function callback() {
    if (!document.querySelector('#gpt-upwork-msg')) {
      let sidebarLayout = document.querySelector('#sidebar-layout .up-d-sidebar')
      let div = document.createElement('div')
      div.id = 'gpt-upwork-msg'
      ReactDOM.createRoot(div).render(<UpworkClientMsg />)
      sidebarLayout?.insertAdjacentElement('beforeend', div)
    }
  }
  if (targetNode) observer.observe(targetNode, config)
}
