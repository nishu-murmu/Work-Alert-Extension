import MyComponent from './components/MyComponent'
import ReactDOM from 'react-dom/client'

let div = document.createElement('div')
div.style.position = 'absolute'
div.style.top = '100px'
div.style.left = '100px'
div.style.zIndex = '9999999'

ReactDOM.createRoot(div).render(<MyComponent />)
document.body.prepend(div)
