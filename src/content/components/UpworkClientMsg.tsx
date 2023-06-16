import React, { useState } from 'react'
import { getAllChat, getGptAnsFromBG } from '../../util'
import unescape from 'unescape-js'

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
        `
            Below is the my upwork conversation with ${client_name}
            Please write a message for me
            I want to ${message}
            
            Conversation: ${formattedString}
        `,
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
        <label htmlFor="message">Message</label>
        <input
          type="text"
          name="client_name"
          id="client_name"
          defaultValue={getAllChat().client}
          required
        />
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
