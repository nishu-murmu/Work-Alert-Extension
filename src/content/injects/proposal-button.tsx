import ReactDOM from 'react-dom/client'
import ProprosalButton from '../components/ProposalButton'

window.onload = () => {
  // Attaching ProposalButton component to shadowDOM
  let div = document.createElement('div') as HTMLElement
  div.id = 'injected-button'
  div.style.position = 'relative'
  const shadow = div.attachShadow({ mode: 'open' })

  const coverLetterDiv = document.querySelector('.cover-letter-area')
  coverLetterDiv?.prepend(div)
  const renderElem = document.createElement('div')
  renderElem.id = 'render-button'
  renderElem.style.right = '2px'
  renderElem.style.bottom = '-20px'
  renderElem.style.position = 'absolute'

  ReactDOM.createRoot(renderElem).render(<ProprosalButton />)
  shadow.appendChild(renderElem)
}