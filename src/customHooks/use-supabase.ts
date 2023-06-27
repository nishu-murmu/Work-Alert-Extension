import { supabase } from '../supabase/init'
import { keywordProps, proposalsProps } from '../util/types'

export const useSupabase = () => {
  async function login({ email, password }: any) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      localStorage.setItem('user', JSON.stringify(data.user))
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
      localStorage.setItem('user', JSON.stringify(data.user))
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
    const { proposal, name, skills, profile, user_id, inbuilt_proposal, experience, portfolio } =
      proposalParams
    try {
      const { data } = await supabase
        .from('proposals')
        .insert([
          {
            proposal,
            user_id,
            name,
            skills,
            profile,
            inbuilt_proposal,
            experience,
            portfolio,
          },
        ])
        .select()
      return data
    } catch (err) {
      return err
    }
  }

  async function updateProfile(proposalParams: proposalsProps) {
    const {
      proposal,
      name,
      skills,
      profile,
      client,
      inbuilt_proposal,
      experience,
      portfolio,
      id,
      status,
    } = proposalParams
    try {
      const { data } = await supabase
        .from('proposals')
        .update([
          {
            proposal,
            name,
            skills,
            status,
            profile,
            client,
            inbuilt_proposal,
            experience,
            portfolio,
          },
        ])
        .eq('id', id)
        .select()
      return data
    } catch (err) {
      return err
    }
  }

  async function getAllProfiles() {
    try {
      const { data } = await supabase.from('proposals').select('*')
      return data
    } catch (error) {
      return error
    }
  }

  async function createKeyword(keywordParams: keywordProps) {
    const { rssLink, keyword, isPublic, status, user_id } = keywordParams
    try {
      const { data } = await supabase
        .from('keywords')
        .insert([
          {
            rssLink,
            keyword,
            isPublic,
            status,
            user_id,
          },
        ])
        .select()
      return data
    } catch (err) {
      return err
    }
  }

  async function updateKeyword(keywordParams: keywordProps) {
    const { status, id } = keywordParams
    try {
      const { data } = await supabase.from('keywords').update([{ status }]).eq('id', id).select()
      return data
    } catch (err) {
      return err
    }
  }

  async function getAllKeywords(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await supabase.from('keywords').select('*')
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    login,
    signUp,
    signOut,
    createProfile,
    updateProfile,
    getAllProfiles,
    createKeyword,
    updateKeyword,
    getAllKeywords,
  }
}
