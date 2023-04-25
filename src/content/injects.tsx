import ReactDOM from 'react-dom/client'
import '../styles/main-compiled.css'
import ToggleScriptButton from './components/ToggleSciprtButton'

let listElem = document.createElement('li') as HTMLElement
listElem.id = 'toggle-tabs'

ReactDOM.createRoot(listElem).render(<ToggleScriptButton />)
document.querySelector('.nav-messages')?.insertAdjacentElement('afterend', listElem)
