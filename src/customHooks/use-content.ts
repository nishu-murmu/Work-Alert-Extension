import { useRecoilState } from 'recoil'
import { userState } from '../options/atoms'
import { useSupabase } from './use-supabase'

export const useContent = () => {
  const [user, setUser] = useRecoilState(userState)
  const { createProfile, updateProfile } = useSupabase()
  const setProposal = async (proposal: any, name: any) => {
    return new Promise<boolean>((resolve) => {
      let newProposals: any
      chrome.storage.local.get(['proposals'], (response) => {
        if (name) {
          updateProfile(proposal[0]).then((res: any) => {
            if (res[0]?.id) {
              const allProposals = response?.proposals
              let index = allProposals?.findIndex((obj: any) => obj.profile == name)

              if (index != -1) {
                allProposals[index] = proposal[0]
              }
              chrome.storage.local.set({ proposals: allProposals }).then(() => {
                resolve(true)
              })
            }
          })
        } else {
          const allProposals = response?.proposals
          let index = -1
          createProfile({ ...proposal[0], user_id: user?.user?.id }).then((res: any) => {
            if (res[0]?.id) {
              proposal[0] = res?.[0]
              if (response?.proposals && response?.proposals?.length > 0) {
                index = allProposals?.findIndex((obj: any) => obj.profile == proposal[0].profile)
                proposal = {
                  ...proposal[0],
                  tone: proposal[0].tone === 'select' ? undefined : proposal[0].tone,
                  range_of_words:
                    proposal[0].tone === 'default' ? undefined : proposal[0].range_of_words,
                }
                newProposals = [...res?.proposals, proposal]
              } else newProposals = proposal
              if (index == -1) {
                chrome.storage.local.set({ proposals: newProposals }).then(() => {
                  resolve(true)
                })
              }
            }
          })
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

        updateProfile({ ...proposal, status: true }).then((response: any) => {
          if (response[0]?.id) {
            if (res?.proposals) {
              const filteredProposal = res?.proposals.filter(
                (a: any) => a.profile !== proposal.profile,
              )
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
          }
        })
      })
    })
  }

  return { setProposal, getProposals, deleteProposal }
}
function updateProfile(arg0: any) {
  throw new Error('Function not implemented.')
}
