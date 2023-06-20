import React, { useState } from 'react'
import { getAllChat, getGptAnsFromBG } from '../../util'
import unescape from 'unescape-js'
import { config } from '../../util/config'

const ClientMessage = () => {
  const [generatedANS, setGeneratedANS] = useState('')

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const { message, client_name } = Object.fromEntries(formData.entries())
    const { formattedString, client } = getAllChat()
    getGptAnsFromBG({
      from: 'ClientMessage.tsx',
      query: [
        config.upwork_msg_ans_macro
          .replace('#{client_name}', (client_name || client) as string)
          .replace('#{message}', (message || '') as string)
          .replace('#{formattedString}', formattedString),
      ],
      type: 'get_client_ans_from_gpt',
      callback: (str) => {
        if (str.length > 0) setGeneratedANS(unescape(str))
      },
    })
  }

  return (
    <div className="flex justify-center mt-5 flex-col items-center">
      <form className="w-full max-w-sm" onSubmit={onSubmit}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="client_name"
            >
              Client Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="client_name"
              type="text"
              defaultValue={getAllChat().client}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="message"
            >
              Message
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="message"
              type="text"
            />
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Generate Answer
            </button>
          </div>
        </div>
      </form>

      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4"
      >
        GPT Answer
      </label>
      <textarea
        id="message"
        rows={15}
        value={generatedANS}
        onChange={(e) => setGeneratedANS(e.target.value)}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Generating answer...."
      ></textarea>
    </div>
  )
}

export default ClientMessage
