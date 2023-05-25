import ReactDOM from 'react-dom/client'
import PromptButton from '../components/PromptButton'
import useGPT from '../../customHooks/use-gpt'
const { getToken, deleteToken } = useGPT()
let startX: any
let startY: any
document.body.addEventListener('mousedown', (event) => {
  startX = event.pageX
  startY = event.pageY
})

if (!document.querySelector('#injected-icon-button')) {
  document.body.addEventListener('mouseup', (e: MouseEvent) => {
    let linkElement = document.createElement('link')
    linkElement.rel = 'stylesheet'
    linkElement.type = 'text/css'
    linkElement.href = chrome.runtime.getURL('/src/styles/main-compiled.css')
    let icon: any

    const diffX = Math.abs(e.pageX - startX)
    const diffY = Math.abs(e.pageY - startY)
    let delta = 6
    let mouse_position = { X: '', Y: '' }
    mouse_position.X = (e.clientX - 12).toString() + 'px'
    mouse_position.Y = (e.clientY - 5).toString() + 'px'

    let elem = document.createElement('div') as HTMLDivElement
    elem.id = 'injected-icon-button'
    elem.style.position = 'fixed'
    elem.style.borderRadius = '50%'
    elem.style.border = 'transparent'
    elem.style.width = '40px'
    elem.style.height = '40px'
    elem.style.left = mouse_position.X
    elem.style.zIndex = '999999'
    elem.style.top = mouse_position.Y
    if (document.querySelector('#injected-icon-button')) {
      icon = Object.values(document.querySelector('#injected-icon-button') as HTMLDivElement)
    }
    console.log('click', diffX, diffY)
    
    setTimeout(() => {
      let rootElem = document.createElement('div') as HTMLDivElement
      rootElem.id = 'root-injected-icon-button'
      if (icon === undefined && diffX > delta && diffY > delta) {
        document.body.prepend(rootElem)
        const shadowDOM = rootElem.attachShadow({ mode: 'open' })
        shadowDOM.append(linkElement)
        ReactDOM.createRoot(elem).render(<PromptButton />)
        shadowDOM.appendChild(elem)
      } else if (window.getSelection()?.toString() === '') {
        //@ts-ignore
        document.querySelector('#root-injected-icon-button')?.remove() as HTMLDivElement
      }
    }, 50);
  })
}

document.body.addEventListener('wheel', () => {
  //@ts-ignore
  document.querySelector('#root-injected-icon-button')?.remove() as HTMLDivElement
})
