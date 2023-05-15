import ReactDOM from 'react-dom/client'
import '../../styles/content.css'
import ToggleScriptButton from '../components/ToggleSciprtButton'

let listElem = document.createElement('li') as HTMLElement
listElem.id = 'toggle-tabs'
document.querySelector('.nav-messages')?.insertAdjacentElement('afterend', listElem)

ReactDOM.createRoot(listElem).render(<ToggleScriptButton />)