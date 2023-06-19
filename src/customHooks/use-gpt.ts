import { v4 as uuidv4 } from 'uuid'
import { QueryProps } from '../util/types'
import { StreamClient } from '../util/SSE'
import { config } from '../util/config'
let accessToken: string = ''
let stream: any
chrome.storage.local.get(['gpt_access_token']).then((res) => {
  accessToken = res.gpt_access_token
})
const message_id = uuidv4()

const useGPT = () => {
  function getSession() {
    return new Promise((resolve) => {
      fetch(config.gpt_session_api)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            chrome.storage.local.set({ gpt_access_token: data.accessToken })
            resolve({ success: true, data })
          } else {
            chrome.storage.local.set({ gpt_access_token: null })
            resolve({ success: false, data })
          }
        })
        .catch((err) => {
          console.log(err)
          resolve(err)
        })
    })
  }

  const generateAns = async (queryParams: string[]) => {
    if (accessToken) {
      stream = new StreamClient(config.gpt_conversation_api, {
        headers: {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.9',
          authorization: `Bearer ${accessToken}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          action: 'next',
          messages: [
            {
              content: {
                content_type: 'text',
                parts: queryParams,
              },
              id: message_id,
              role: 'user',
            },
          ],
          model: 'text-davinci-002-render-sha',
          parent_message_id: uuidv4(),
        }),
        method: 'POST',
        mode: 'no-cors',
        credentials: 'include',
      })

      //@ts-ignore
      chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        let tabId: any = tabs[0]?.id
        stream.onmessage = (event: any) => {
          console.log({ data: event.data })
          if (event.data.trim() != 'data: [DONE]') {
            let value = event.data.slice(
              event.data.lastIndexOf('data:'),
              event.data.lastIndexOf('}'),
            )
            const data: any = JSON.parse(value.slice(6) + '}')
            chrome.tabs.sendMessage(tabId, {
              type: 'generated_ans',
              data: data?.message?.content?.parts[0].toString(),
              isClosed: true,
            })
          } else {
            chrome.tabs.sendMessage(tabId, {
              type: 'generated_ans',
              isClosed: false,
            })
            stream.close()
            genTitle()
          }
        }
        stream._onStreamFailure = (err: any) => {
          chrome.tabs.sendMessage(tabId, {
            type: 'generated_ans',
            error: true,
            errMsg: err,
          })
        }
      })
    }
  }
  const getToken = async () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get('gpt_access_token', (res) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        } else {
          resolve(res)
        }
      })
    })
  }

  const deleteToken = async () => {
    return new Promise((resolve) => {
      chrome.storage.local.remove('gpt_access_token').then(() => {
        resolve(true)
      })
    })
  }
  async function genTitle() {
    await fetch(`${config.gpt_conversation_api}s?offset=0&limit=20&order=updated`, {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9',
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
      method: 'GET',
    })
      .then((res) => res.json())
      .then(async (data) => {
        let id = data.items[0]?.id
        const response = await fetch(`${config.gpt_conversation_api}/gen_title/${id}`, {
          headers: {
            accept: '*/*',
            authorization: `Bearer ${accessToken}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            message_id: message_id,
          }),
          method: 'POST',
        })
        if (response.ok) {
          deleteTitle(id.toString())
        }
      })
  }

  async function deleteTitle(messageId: string) {
    fetch(`${config.gpt_conversation_api}/${messageId}`, {
      headers: {
        accept: '*/*',
        authorization: `Bearer ${accessToken}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        is_visible: false,
      }),
      method: 'PATCH',
    }).catch((err) => console.log({ err }))
  }

  function closeAns() {
    //@ts-ignore
    stream.close()
  }

  return { getSession, generateAns, genTitle, closeAns, getToken, deleteToken }
}

export default useGPT
