import ReactDOM from 'react-dom/client'
import PromptButton from '../components/prompt/PromptButton'
let selectedText: string | undefined
let mouse_position: any
let elem: HTMLDivElement
let icon: any

document.addEventListener('selectionchange', (e: any) => {
  selectedText = window.getSelection()?.toString()
})

document.body.addEventListener('mouseup', (e) => {
  let linkElement = document.createElement('link')
  linkElement.rel = 'stylesheet'
  linkElement.type = 'text/css'
  linkElement.href = chrome.runtime.getURL('/src/styles/output.css')
  mouse_position = { X: '', Y: '' }
  mouse_position.X = (e.clientX - 12).toString() + 'px'
  mouse_position.Y = (e.clientY - 5).toString() + 'px'

  console.log(
    document.querySelector('#root-injected-icon-button'),
    window.getSelection()?.toString(),
    'check',
  )
  let shadowDOM: any
  if (!document.querySelector('#root-injected-icon-button')) {
    elem = document.createElement('div') as HTMLDivElement
    elem.id = 'injected-icon-button'
    elem.style.position = 'fixed'
    elem.style.borderRadius = '50%'
    elem.style.border = 'transparent'
    elem.style.width = '30px'
    elem.style.height = '30px'
    elem.style.left = mouse_position.X
    elem.style.zIndex = '999999'
    elem.style.top = mouse_position.Y

    let rootElem = document.createElement('div') as HTMLDivElement
    rootElem.id = 'root-injected-icon-button'
    document.body.prepend(rootElem)
    shadowDOM = rootElem.attachShadow({ mode: 'open' })
    shadowDOM.append(linkElement)
    if (selectedText) ReactDOM.createRoot(elem).render(<PromptButton selectedText={selectedText} />)
    shadowDOM.appendChild(elem)
  } else {
    //@ts-ignore
    document.querySelector('#injected-icon-button')?.remove() as HTMLDivElement
  }
  shadowDOM.appendChild(elem)
})

document.body.addEventListener('wheel', () => {
  //@ts-ignore
  document.querySelector('#root-injected-icon-button')?.remove() as HTMLDivElement
})
