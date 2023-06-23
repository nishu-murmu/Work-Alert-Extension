import { supabase } from '../supabase/init'
import { proposalsProps } from '../util/types'

export const useSupabase = () => {
  async function login({ email, password }: any) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      localStorage.setItem('user', JSON.stringify(data))
      chrome.storage.local.set({ user: data })
      console.log({ data, error })
      return { data, error }
    } catch (e) {
      console.log({ e })
      return { data: null, error: true }
    }
  }

  async function signUp({ email, password }: any) {
    try {
      const { data } = await supabase.auth.signUp({
        email,
        password,
      })
      console.log(data)
      chrome.storage.local.set({ user: data })
      localStorage.setItem('user', JSON.stringify(data))
      return data.user
    } catch (error) {
      console.log({ error })
      return error
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    localStorage.setItem('user', JSON.stringify(null))
    return error ?? true
  }

  async function createProfile(proposalParams: proposalsProps) {
    const { proposal, name, skills, profile, user_id, prebuilt, experience, portfolio } =
      proposalParams
    try {
      const { data, error } = await supabase.from('proposal').insert([
        {
          proposal,
          user_id,
          name,
          skills,
          profile,
          inbuilt_proposal: prebuilt,
          experience,
          portfolio,
        },
      ])
      return data
    } catch (err) {
      return err
    }
  }

  async function updateProfile(proposalParams: proposalsProps) {
    const { proposal, name, skills, profile, client, user_id, prebuilt, experience, portfolio } =
      proposalParams
    try {
      const { data, error } = await supabase
        .from('proposal')
        .update([
          {
            proposal,
            user_id,
            name,
            skills,
            profile,
            client,
            inbuilt: prebuilt,
            experience,
            portfolio,
          },
        ])
        .eq('user_id', user_id)
        .select()
      return data
    } catch (err) {
      return err
    }
  }

  async function getAllProfiles() {
    try {
      const { data } = await supabase.from('proposal').select('*')
      return data
    } catch (error) {
      return error
    }
  }

  return { login, signUp, signOut, createProfile, updateProfile, getAllProfiles }
}
