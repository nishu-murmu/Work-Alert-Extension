import { v4 as uuidv4 } from 'uuid'
import { QueryProps } from '../util/types'

const useGPT = () => {
  function getSession() {
    return new Promise((resolve) => {
      fetch('https://chat.openai.com/api/auth/session')
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            chrome.storage.local.set({ gpt_access_token: data.accessToken })
          } else {
            chrome.storage.local.set({ gpt_access_token: null })
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          resolve(true)
        })
    })
  }

  function generateQueryParams(query: QueryProps) {
    const result: string[] = [
      `Name: ${query.name}\nSkills: ${query.skills.join(' ')}\nExperience: ${
        query.experience
      }\nPrevious Clients: Facebook`,
      `Client Job Description: ${query.job_description}`,
      `Extract pain points from client job description and write a cover letter around it in a ${query.tone} tone and it should not exceed ${query.range_of_words} words.`,
      `${query.optional_info ?`Additional Instructions: ${query.optional_info}`:""}`,
    ].filter(Boolean)

    return result
  }
  const generateAns = async (query: QueryProps): Promise<string> => {
    const queryParams: string[] = generateQueryParams(query)
    let source: any
    const accessToken = await chrome.storage.local.get(['gpt_access_token'])
    const message_id = uuidv4()
    return new Promise(async (resolve, reject) => {
      if (accessToken) {
        const result: any = await fetch('https://chat.openai.com/backend-api/conversation', {
          headers: {
            accept: '*/*',
            'accept-language': 'en-US,en;q=0.9',
            authorization: `Bearer ${accessToken}`,
            'content-type': 'application/json',
            // 'sec-fetch-dest': 'empty',
            // 'sec-fetch-mode': 'cors',
            // 'sec-fetch-site': 'none',
          },
          referrerPolicy: 'strict-origin-when-cross-origin',
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
          mode: 'cors',
          credentials: 'include',
        })
        resolve(result)
      } else {
        reject("api failed")
      }
    })
  }
  return { getSession, generateAns }
}

export default useGPT
