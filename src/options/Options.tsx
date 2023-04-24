import { useEffect, useState } from 'react'
import HeaderSection from './components/sections/HeaderSection'
import MainSection from './components/sections/MainSection'
import ProfileSection from './components/sections/ProfileSection'
import RouteSection from './components/sections/RouteSection'

function App() {
  const [route, setRoute] = useState('')
  useEffect(() => {
    setRoute('home')
  }, [])

  return (
    <div className="bg-black text-white min-h-screen">
      <HeaderSection />
      <RouteSection setRoute={setRoute} />
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
