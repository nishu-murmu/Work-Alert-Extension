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

  let shadowDOM: any
  if (!document.querySelector('#root-injected-icon-button')) {
    elem = document.createElement('div') as HTMLDivElement
    elem.id = 'injected-icon-button'
    elem.style.position = 'absolute'
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
})

document.body.addEventListener('click', function (event: any) {
  var excludedDiv = document.getElementById('root-injected-icon-button')

  // Check if the clicked element is the excluded div or one of its descendants
  var isExcluded = event.target === excludedDiv || excludedDiv?.contains(event.target)

  // If the clicked element is the excluded div or its descendant, return early and skip the click handler's execution
  if (isExcluded) {
    console.log('not clicked')
    return
  }
  console.log('clicked')
  //@ts-ignore
  // document.querySelector('#root-injected-icon-button')?.remove() as HTMLDivElement
})

// document.body.addEventListener('wheel', () => {
//   //@ts-ignore
//   document.querySelector('#root-injected-icon-button')?.remove() as HTMLDivElement
// })
