import ReactDOM from 'react-dom/client'
import ContextModal from '../components/prompt/PromptModal'

let linkElement = document.createElement('link')
linkElement.rel = 'stylesheet'
linkElement.type = 'text/css'
linkElement.href = chrome.runtime.getURL('/src/styles/output.css')

let rootElement = document.createElement('div')
rootElement.id = 'context-modal'
//@ts-ignore
rootElement.style = `position:fixed;right:10px;top:70px;background:#282828;margin:5px;padding:20px;border:1px solid black;border-radius:10px;z-index:9999;`
document.body.prepend(rootElement)
const shadowDOM = rootElement.attachShadow({ mode: 'open' })

shadowDOM.append(linkElement)

const renderElement = document.createElement('div') as HTMLElement
renderElement.id = 'render-context'

ReactDOM.createRoot(renderElement).render(<ContextModal />)

shadowDOM.appendChild(renderElement)
rootElement.style.display = 'none'
renderElement.style.display = 'none'

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.log(req, 'from modal')
  if (req.type === 'display_modal') {
    console.log('check modal open')
    rootElement.style.display = 'block'
    renderElement.style.display = 'block'
  }
})
