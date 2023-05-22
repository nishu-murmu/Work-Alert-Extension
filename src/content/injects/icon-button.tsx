import ReactDOM from 'react-dom/client'
import IconButton from '../components/IconButton'
import useGPT from '../../customHooks/use-gpt'
const { getToken, deleteToken } = useGPT()

if (!document.querySelector('#injected-icon-button')) {
  document.body.addEventListener('mouseup', (e: MouseEvent) => {
    let icon: any
    let mouse_position = { X: '', Y: '' }
    mouse_position.X = (e.clientX - 12).toString() + 'px'
    mouse_position.Y = (e.clientY - 5).toString() + 'px'
    
    let elem = document.createElement('button') as HTMLButtonElement
    elem.id = 'injected-icon-button'
    elem.style.position = 'fixed'
    elem.style.borderRadius ="50%"
    elem.style.border = "transparent"
    elem.style.width = "40px"
    elem.style.height = "40px"
    elem.style.left = mouse_position.X
    elem.style.zIndex = '999999'
    elem.style.top = mouse_position.Y
    if(document.querySelector('#injected-icon-button')) {
      icon = Object.values(document.querySelector('#injected-icon-button') as HTMLButtonElement)
    }
    if(icon === undefined) {
      
      window.getSelection()?.toString()
      document.body.prepend(elem)
      ReactDOM.createRoot(elem).render(<IconButton />)
    }
  })
}
