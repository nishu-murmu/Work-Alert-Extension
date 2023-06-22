import { supabase } from '../supabase/init'

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

  return { login, signUp, signOut }
}
