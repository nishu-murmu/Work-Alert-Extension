import UserIcon from '@heroicons/react/24/outline/UserIcon'
import { useState, useRef, Fragment, useEffect } from 'react'
import { useSupabase } from '../../../customHooks/use-supabase'
import CustomModal from '../../components/commonComponent/core/CustomModal'
import { Menu, Transition } from '@headlessui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userState } from '../../atoms'

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signOut } = useSupabase()
  const [userIcon, setUserIcon] = useState<boolean>(false)
  const [user, setUser] = useRecoilState(userState)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user?.id) {
      setUserIcon(true)
    }
  }, [])
  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }
  function confirm() {
    setLoading(true)
    signOut().then((res) => {
      if (res) {
        localStorage.removeItem('user')
        setUser({})
        setIsOpen(false)
      }
    })
  }

  return (
    <div className="container flex justify-between p-4 mx-auto">
      <div className="text-3xl py-2 font-extrabold">
        <Link to={'/home'}>
          EnactOn <span className="text-green-500">Work</span>Alert
        </Link>
      </div>

      {userIcon && (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <UserIcon className="h-8 w-8" stroke="white" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={openModal}
                      className={`${
                        active ? 'bg-custom-bg' : ' bg-custom-bg-light text-white'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Sign Out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
      <CustomModal
        confirm={confirm}
        loading={loading}
        closeModal={closeModal}
        openModal={openModal}
        isOpen={isOpen}
        modal_title="Are you sure you want to Logout?"
      />
    </div>
  )
}

export default Header
