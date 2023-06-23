import { useNavigate } from 'react-router-dom'
import { SpinnerLoader } from '../../util/Icons'
import { FormEvent, useEffect } from 'react'
import { useSupabase } from '../../customHooks/use-supabase'
import { userState } from '../atoms'
import { useRecoilState } from 'recoil'
import MainLayout from '../layouts/main-layout'

export default function SignUp({ loading, isCreate }: any) {
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
      signUp({
        email,
        password,
      }).then((res: any) => {
        if (res?.id) {
          setUser(res)
          navigate('/home')
        }
      })
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
      <form
        className='border border-white rounded-xl p-4 flex flex-col gap-4  w-3/12 mx-auto'
        action='#'
        onSubmit={onSubmit}
      >
        <div>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-200 dark:text-white'
          >
            Your email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            className='bg-transparent border border-gray-300 text-gray-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='name@company.com'
            required={true}
          />
        </div>
        <div>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-200 dark:text-white'
          >
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            className='bg-transparent border border-gray-300 text-gray-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required={true}
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='text-white bg-primary-600 border border-white px-8 py-3 flex items-center justify-center hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm hover:bg-custom-bg-light hover:text-white w-1/3 mx-auto text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
        >
          {loading ? (
            <span className=''>
              <SpinnerLoader className='w-5 h-5' />
            </span>
          ) : isCreate ? (
            'Create'
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
    </MainLayout>
  )
}
