import { useState } from 'react'
import InjectedPrompt from './Prompt'

const PromptButton: React.FC<{ selectedText: string }> = ({ selectedText }) => {
  const [show, setShow] = useState<boolean>(false)
  return (
    <>
      <img
        src={`${chrome.runtime.getURL('/img/enacton.png')}`}
        style={{ width: '100%', cursor: 'pointer' }}
        onClick={() => setShow((prev) => !prev)}
      />
      {show && <InjectedPrompt selectedText={selectedText}/>}
    </>
  )
}

export default PromptButton
