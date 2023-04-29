const useGPT = () => {
  function getSession() {
    return new Promise((resolve) => {
      fetch('https://chat.openai.com/api/auth/session')
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            chrome.storage.local.set({ gpt_access_token: data.accessToken })
            resolve(true)
          } else {
            chrome.storage.local.set({ gpt_access_token: null })
            resolve(false)
          }
        })
        .catch((err) => {
          resolve(false)
          console.log(err)
        })
    })
  }

  const getToken = async () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get('gpt_access_token', (res) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        } else {
          if (typeof res === 'object') {
            if (Object.keys(res).length > 0) {
            } else {
              resolve(false)
            }
          }
          if (res.get_access_token) {
            resolve(true)
          } else resolve(false)
        }
      })
    })
  }
  return { getSession, getToken }
}

export default useGPT
