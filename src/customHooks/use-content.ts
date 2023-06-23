import { useRecoilState } from 'recoil'
import { userState } from '../options/atoms'
import { useSupabase } from './use-supabase'

export const useContent = () => {
  const [user, setUser] = useRecoilState(userState)
  const setProposal = async (proposal: any, name: any) => {
    const { createProfile, updateProfile } = useSupabase()
    return new Promise<boolean>((resolve) => {
      let newProposals: any
      chrome.storage.local.get(['proposals'], (res) => {
        if (name) {
          console.log('check')
          const allProposals = res?.proposals
          let index = allProposals?.findIndex((obj: any) => obj.profile == name)

          if (index != -1) {
            allProposals[index] = proposal[0]
          }
          updateProfile(proposal[0]).then((res) => {
            console.log(res, 'proposal res')
          })
          chrome.storage.local.set({ proposals: allProposals }).then(() => {
            resolve(true)
          })
        } else {
          const allProposals = res?.proposals
          console.log('check another')
          let index = -1
          if (res?.proposals && res?.proposals?.length > 0) {
            createProfile({ ...proposal[0], user_id: user?.user?.id }).then((res) => {
              console.log(res, 'proposal res')
            })
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

  return { setProposal, getProposals, deleteProposal }
}
