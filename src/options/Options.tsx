import { useEffect, useState } from 'react'
import HeaderSection from './components/sections/HeaderSection'
import MainSection from './components/sections/MainSection'
import ProfileSection from './components/sections/ProfileSection'
import RouteSection from './components/sections/RouteSection'
import { useRecoilState } from 'recoil'
import { isJobs } from './atoms'

function App() {
  const [route, setRoute] = useState('')
  const [isClick, setIsClicked] = useRecoilState(isJobs)

  useEffect(() => {
    setRoute('home')
  }, [])

  return (
    <div className="bg-black text-white min-h-screen">
      {!isClick && (
        <>
          <HeaderSection />
          <RouteSection setRoute={setRoute} />
        </>
      )}

      {route == 'home' ? (
        <div className="py-4 flex flex-col gap-y-4">
          <MainSection />
        </div>
      ) : (
        <div>
          <ProfileSection />
        </div>
      )}
    </div>
  )
}

export default App
