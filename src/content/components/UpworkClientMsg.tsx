import React, { useState } from 'react'
import { getAllChat, getGptAnsFromBG } from '../../util'
import unescape from 'unescape-js'
import { config } from '../../util/config'

const UpworkClientMsg = () => {
  const [generatedANS, setGeneratedANS] = useState('')

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const { message, client_name } = Object.fromEntries(formData.entries())
    const { formattedString, client } = getAllChat()
    getGptAnsFromBG({
      from: 'UpworkClientMsg.tsx',
      query: [
        config.upwork_msg_ans_macro
          .replace('#{client_name}', client)
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
    <div>
      <form action="#" onSubmit={onSubmit}>
        <label htmlFor="message">Client Name:</label>
        <input
          type="text"
          name="client_name"
          id="client_name"
          defaultValue={getAllChat().client}
          required
        />
        <label htmlFor="message">Message:</label>
        <input type="text" name="message" id="message" required />
        <button type="submit">Send</button>
      </form>
      <textarea
        name="gpt_ans"
        id="gpt_ans"
        style={{ width: '100%', height: 400 }}
        value={generatedANS}
        onChange={(e) => setGeneratedANS(e.target.value)}
      />
    </div>
  )
}

export default UpworkClientMsg
