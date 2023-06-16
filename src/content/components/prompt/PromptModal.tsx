import unescape from 'unescape-js'
import { useEffect, useState } from 'react'
import { CrossIcon } from '../../../util/Icons'
import ThreeDotsLoader from '../Loaders/three-dots'

const PromptModal: React.FC<{}> = () => {
  const [textarea, setTextArea] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [customInput, setCustomInput] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
      if (req.type === 'display_modal') {
        setLoading(true)
        //@ts-ignore
        document.querySelector('#context-modal').style.display = 'block'
      }
      if (req.type === 'display_input') {
        setCustomInput((prev) => !prev)
        //@ts-ignore
        document.querySelector('#context-modal').style.display = 'block'
      }
      if (req.type == 'generated_ans') {
        setLoading(false)
        if (req.error && req.error == true) {
          setError(true)
        } else if (req.type === 'generated_ans') {
          let result = req.data.slice(req.data.indexOf('parts'), req.data.indexOf('status'))
          result = result?.slice(10, result.length - 6)
          if (result !== '') setTextArea(unescape(result))
        }
      }
    })
  }, [])

  function hideModal() {
    //@ts-ignore
    document.querySelector('#context-modal').style.display = 'none'
  }

  useEffect(() => {}, [textarea])

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <button className="text-white">WorkAlert</button>
        <button onClick={hideModal}>
          <CrossIcon className="w-5 h-5" strokeColor="white" />
        </button>
      </div>
      {!loading ? (
        <span className="rounded-lg w-full text-white outline-none border-none p-3">
          <ThreeDotsLoader />
        </span>
      ) : error ? (
        <span className="rounded-lg w-full text-white outline-none border-none p-3">
          <p className="text-red-500 text-center flex">Failed to fetch</p>
        </span>
      ) : (
        <div className="flex flex-col gap-y-4 my-2">
          {customInput && (
            <input
              type="text"
              name="custom-input"
              id="custom-input"
              placeholder="Custom Prompt"
              className="rounded-md w-full p-2 text-white"
            />
          )}
          <div>
            <label htmlFor="ans">Generated Ans:</label>
            <textarea
              name="ans"
              id="ans"
              style={{ fontSize: '13px' }}
              className="rounded-lg w-full text-white outline-none border-none p-3"
              cols={40}
              rows={8}
              defaultValue={textarea}
            ></textarea>
          </div>
        </div>
      )}
    </div>
  )
}

export default PromptModal
