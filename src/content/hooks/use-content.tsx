import { useEffect } from 'react'

export const useContent = () => {
  // useEffect(() => {
  //   getLocalProfile()
  // }, [])

  const getLocalProfile = () => {
    return new Promise((resolve) => {
      chrome.storage.local.get(['proposals'], (result) => {
        resolve(result.proposals)
      })
    })
  }

  return { getLocalProfile }
}
