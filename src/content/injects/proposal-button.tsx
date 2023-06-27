import ReactDOM from 'react-dom/client'
import ProprosalButton from '../components/proposal/ProposalButton'

const observer = new MutationObserver(() => {
  const coverLetterDiv = document.querySelector('.cover-letter-area')
  if (coverLetterDiv) {
    console.log('mutation called')
    let div = document.createElement('div') as HTMLElement
    div.style.position = 'relative'
    div.id = 'proposal-button'
    div.style.right = '30px'
    div.style.top = '0px'
    div.style.position = 'absolute'
    const coverLetterDiv = document.querySelector('.cover-letter-area')
    coverLetterDiv?.prepend(div)

    const shadow = div.attachShadow({ mode: 'open' })
    ReactDOM.createRoot(shadow).render(<ProprosalButton />)
    observer.disconnect()
  }
})

observer.observe(document.body, { childList: true, attributes: true, subtree: true })
