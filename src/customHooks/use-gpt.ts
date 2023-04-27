
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
  return { getSession }
}

export default useGPT