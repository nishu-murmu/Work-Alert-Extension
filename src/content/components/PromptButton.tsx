import { useState } from 'react'
import InjectedPrompt from './Prompt'

const IconButton = () => {
  const [show, setShow] = useState<boolean>(false)
  return (
    <>
      <img
        src={`${chrome.runtime.getURL('/img/enacton.png')}`}
        style={{ width: '100%' }}
        onClick={() => setShow((prev) => !prev)}
      />
      {show && <InjectedPrompt/>}
    </>
  )
}

export default IconButton
