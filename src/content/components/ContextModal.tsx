import unescape from 'unescape-js'
import { useEffect, useState } from 'react'

const ContextModal: React.FC<{}> = () => {
  const [textarea, setTextArea] = useState<string>('')

  useEffect(() => {
    chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
      if (req.type == 'generated_ans') {
        console.log(req)
        let result = req.data.slice(req.data.indexOf('parts'), req.data.indexOf('status'))
        result = result?.slice(10, result.length - 6)
        if (result !== '') setTextArea(unescape(result))
      }
    })
  }, [])

  return (
    <div className="">
      <textarea
        name="ans"
        id="ans"
        className="rounded-lg w-full text-black outline-none border-none p-3"
        cols={30}
        rows={13}
        defaultValue={textarea}
      ></textarea>
    </div>
  )
}

export default ContextModal
