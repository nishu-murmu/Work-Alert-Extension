import { styles } from '../styles/injected-css'

chrome.tabs.insertCSS({ code: styles })
import './injects/toggle-button'
import './injects/proposal-button'
import './injects/slider'
import './injects/prompt-button'
import './injects/prompt-modal'
