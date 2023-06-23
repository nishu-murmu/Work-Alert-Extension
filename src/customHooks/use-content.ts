import { useRecoilState } from 'recoil'
import { proposals, userState } from '../options/atoms'
import { useSupabase } from './use-supabase'
import { proposalsProps } from '../util/types'

export const useContent = () => {
  const [user, setUser] = useRecoilState(userState)
  const [allProposals, setAllProposals] = useRecoilState(proposals)
  const { createProfile, updateProfile, getAllProfiles } = useSupabase()

  const getProposals = async () => {
    return new Promise((resolve) => {
      getAllProfiles().then((res: any) => {
        console.log({ res })
        const result = res.filter((profile: proposalsProps) => {
          if (profile.user_id === user?.user?.id) {
            return profile
          }
        })
        resolve(result)
      })
    })
  }

  const setProposal = async (proposal: any, name: any) => {
    return new Promise<boolean>((resolve) => {
      if (name) {
        updateProfile(proposal[0]).then((res) => {
          getProposals().then((data: any) => {
            setAllProposals(data.filter((item: any) => !item.status))
          })
        })
        resolve(true)
      } else {
        createProfile({ ...proposal[0], user_id: user?.user?.id }).then((res: any) => {
          if (res[0]?.id) {
            getProposals().then((data: any) => {
              setAllProposals(data.filter((item: any) => !item.status))
            })
            resolve(true)
          }
        })
      }
    })
  }

  const deleteProposal = async (proposal: any) => {
    return new Promise((resolve) => {
      updateProfile({ ...proposal, status: true }).then((response: any) => {
        if (response[0]?.id) {
          getProposals().then((data: any) => {
            setAllProposals(data.filter((item: any) => !item.status))
          })
          resolve(true)
        }
      })
    })
  }

  const restoreProposal = async (proposal: any) => {
    console.log('check')
    return new Promise((resolve) => {
      updateProfile({ ...proposal, status: false }).then((response: any) => {
        if (response[0]?.id) {
          getProposals().then((data: any) => {
            setAllProposals(data.filter((item: any) => item.status))
          })
          resolve(true)
        }
      })
    })
  }

  return { setProposal, getProposals, deleteProposal, restoreProposal }
}
