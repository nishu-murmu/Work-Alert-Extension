import { useNavigate } from 'react-router-dom'
import { SpinnerLoader } from '../../util/Icons'
import { FormEvent, useEffect } from 'react'
import { useSupabase } from '../../customHooks/useSupabase'
import { userState } from '../atoms'
import { useRecoilState } from 'recoil'
import MainLayout from '../layouts/main-layout'

export default function Login({ loading, isCreate }: any) {
  const navigate = useNavigate()
  const { signUp } = useSupabase()
  const [user, setUser] = useRecoilState(userState)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault()

      const form = e.target as any
      const formFields = form.elements
      const email = formFields.email.value
      const password = formFields.password.value
      const { data, error }: any = await signUp({
        email,
        password,
      })
      if (data?.user?.id) {
        setUser(data.user)
        navigate('/home')
      }
    } catch (e) {
      console.log({ e })
    }
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user?.user?.id) {
      navigate('/home')
    }
  }, [])
  return (
    <MainLayout>
      <form className="space-y-4 md:space-y-6" action="#" onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            required={true}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required={true}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full text-white bg-primary-600 flex items-center justify-center hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          {loading ? (
            <span className="">
              <SpinnerLoader className="w-5 h-5" />
            </span>
          ) : isCreate ? (
            'Create'
          ) : (
            'Sign in'
          )}
        </button>
      </form>
    </MainLayout>
  )
}
