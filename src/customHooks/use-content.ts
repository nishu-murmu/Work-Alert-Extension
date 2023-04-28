import { useEffect } from 'react'

export const useContent = () => {
  const setProposal = async (proposal: any, name: any) => {
    return new Promise<boolean>((resolve) => {
      let newProposals: any
      chrome.storage.local.get(['proposals'], (res) => {
        if (name) {
          const allProposals = res?.proposals
          let index = allProposals?.findIndex((obj: any) => obj.profile == name)

          if (index != -1) {
            allProposals[index] = proposal[0]
          }
          chrome.storage.local.set({ proposals: allProposals }).then(() => {
            resolve(true)
          })
        } else {
          const allProposals = res?.proposals
          let index = -1
          if (res?.proposals && res?.proposals?.length > 0) {
            index = allProposals?.findIndex((obj: any) => obj.profile == proposal[0].profile)
            newProposals = [...proposal, ...res.proposals]
          } else newProposals = proposal
          if (index == -1) {
            chrome.storage.local.set({ proposals: newProposals }).then(() => {
              resolve(true)
            })
          }
        }
      })
    })
  }

  const getProposals = async () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['proposals'], (res) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError)
        } else {
          resolve(res.proposals || [])
        }
      })
    })
  }
  const deleteProposal = async (proposal: any) => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['proposals'], (res) => {
        let newProposals

        if (res?.proposals) {
          const filteredProposal = res?.proposals.filter((a: any) => a.profile !== proposal.profile)
          chrome.storage.local.set({ proposals: filteredProposal }).then(() => {
            newProposals = getProposals().then((res: any) => {
              if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError)
              } else {
                if (Array.isArray(res)) resolve(res || [])
                else {
                  resolve([])
                }
              }
            })
          })
        }
      })
    })
  }

  const fillProposal = (proposal: any) => {
    const textarea: any = document.querySelector('textarea')

    // Set the maximum length of the textarea
    const maxLength = 5000
    textarea.maxLength = maxLength

    // Create the character count element if it doesn't exist
    let characterCountElement: any = document.querySelector('.text-right.text-muted')
    if (!characterCountElement) {
      characterCountElement = document.createElement('div')
      characterCountElement.classList.add('text-right', 'text-muted')
      textarea.parentNode.insertBefore(characterCountElement, textarea.nextSibling)
    }

    // Set the initial textarea value
    textarea.value = proposal
    // Set the initial character count
    const initialCharactersLeft = maxLength - textarea.value.length
    characterCountElement.textContent = `${initialCharactersLeft} characters left`

    // delete the character count element on input
    textarea.addEventListener('input', () => {
      if (document.body.contains(characterCountElement)) {
        var textBoxValue = textarea.value
        characterCountElement.remove()
        if (textBoxValue !== '') {
          characterCountElement.parentNode.removeChild(characterCountElement)
        }
      } else {
        const charactersLeft = maxLength - textarea.value.length
        characterCountElement.textContent = `${charactersLeft} characters left`
      }
    })
  }

  return { setProposal, getProposals, deleteProposal, fillProposal }
}
