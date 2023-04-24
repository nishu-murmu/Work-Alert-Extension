import ProposalButton from './components/ProposalButton'
import ReactDOM from 'react-dom/client'

let div = document.createElement('div')
div.style.position = 'absolute'
div.style.bottom = '100px'
div.style.right = '100px'
div.style.zIndex = '9999999'
div.style.backgroundColor = 'green'
div.style.padding = '10px 15px'
div.style.color = '#ffffff'
div.style.cursor = 'pointer'

ReactDOM.createRoot(div).render(<ProposalButton />)
document.body.prepend(div)
