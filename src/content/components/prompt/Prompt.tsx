import React, { ChangeEvent, FormEvent, useState } from 'react'
import { config } from '../../../util/config'
import { ArrowLeftIcon } from '../../../util/Icons'
import { prompt } from '../../../util/types'

const InjectedPrompt: React.FC<{ selectedText: string }> = ({ selectedText }) => {
  const [showInput, setShowInput] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')

  function submitHandler(option: string, e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault()
    chrome.runtime.sendMessage({
      from: 'from_prompt',
      type: 'generate_ans',
      query: [option, selectedText],
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
      {showInput && (
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => submitHandler(input, e)}
          className="flex gap-x-2"
        >
          <span onClick={() => setShowInput(false)}>
            <ArrowLeftIcon className="w-8 h-8 mt-.5" />
          </span>
          <input
            type="text"
            id="custom"
            name="custom"
            placeholder="Enter custom question for GPT?"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            className="p-2 rounded-md border border-transparent text-black w-full"
          />
          <button type="submit" className="hidden"></button>
        </form>
      )}
    </div>
  )
}
export default InjectedPrompt
