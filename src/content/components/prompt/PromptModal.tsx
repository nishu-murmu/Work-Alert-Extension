import unescape from 'unescape-js'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { CrossIcon } from '../../../util/Icons'
import ThreeDotsLoader from '../Loaders/three-dots'

const PromptModal: React.FC<{}> = () => {
  const [textarea, setTextArea] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [customInput, setCustomInput] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')
  const [text, setText] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
      if (req.type === 'display_modal') {
        setLoading(true)
        //@ts-ignore
        document.querySelector('#context-modal').style.display = 'block'
      }
      if (req.type === 'display_input') {
        setText(req.selectedText)
        setCustomInput((prev) => !prev)
        //@ts-ignore
        document.querySelector('#context-modal').style.display = 'block'
      }
      if (req.type == 'generated_ans') {
        setLoading(false)
        if (req.error && req.error == true) {
          setError(true)
        } else if (req.type === 'generated_ans') {
          console.log(req)
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

  function submitHandler(e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault()
    chrome.runtime.sendMessage({
      from: 'from_prompt',
      type: 'generate_ans',
      query: [input, text],
    })
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
      {error ? (
        <span className="rounded-lg w-full text-white outline-none border-none p-3">
          <p className="text-red-500 text-center flex">Failed to fetch</p>
        </span>
      ) : (
        <div className="flex flex-col gap-y-4 my-2">
          {customInput && (
            <form onSubmit={(e: FormEvent<HTMLFormElement>) => submitHandler(e)}>
              <input
                type="text"
                name="custom-input"
                id="custom-input"
                placeholder="Custom Prompt"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                className="rounded-md w-full p-2 text-white"
              />
              <button className="hidden" type="submit"></button>
            </form>
          )}
          <div>
            <label htmlFor="ans">Generated Ans:</label>
            {loading ? (
              <span className="rounded-lg w-full text-white outline-none h-[180px] border-none p-3">
                <ThreeDotsLoader />
              </span>
            ) : (
              <textarea
                name="ans"
                id="ans"
                style={{ fontSize: '13px' }}
                className="rounded-lg w-full text-white outline-none border-none p-3"
                cols={40}
                rows={8}
                value={textarea}
              ></textarea>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PromptModal
