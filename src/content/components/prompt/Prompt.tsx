import React, { FormEvent, useState } from 'react'
import unescape from 'unescape-js'
import { config } from '../../../util/config'
import { prompt } from '../../../util/types'
import { getGptAnsFromBG } from '../../../util'

const InjectedPrompt: React.FC<{ selectedText: string }> = ({ selectedText }) => {
  const [showInput, setShowInput] = useState<boolean>(false)

  function submitHandler(option: string, e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault()
    getGptAnsFromBG({
      from: 'Prompt.tsx',
      query: [option, selectedText],
      type: 'get_client_ans_from_gpt',
      callback: (str) => {
        if (str.length > 0) {
          chrome.runtime.sendMessage({
            from: 'Prompt.tsx',
            type: 'answer',
            text: unescape(str),
          })
        }
      },
    })
  }
  function customInputHandler() {
    chrome.runtime.sendMessage({
      from: 'from_prompt',
      type: 'custom_input',
      text: selectedText,
    })
  }
  return (
    <div className="cursor-pointer absolute w-[150px] h-[160px] overflow-y-scroll flex flex-col gap-y-1 p-2 m-1 border border-gray-500 rounded-md bg-custom-bg text-white">
      {!showInput &&
        config?.prompt_list.map((option: prompt, index: number) => (
          <div
            className="hover:bg-custom-bg-light p-2 text-sm rounded-md border border-transparent"
            onClick={(e) => {
              e.stopPropagation()
              if (option.key !== config.prompt_list?.[config.prompt_list.length - 1]?.key) {
                if (option?.value) {
                  submitHandler(option.value)
                } else setShowInput((prev) => !prev)
              } else {
                customInputHandler()
              }
            }}
            key={index}
          >
            {option.key}
          </div>
        ))}
    </div>
  )
}
export default InjectedPrompt
