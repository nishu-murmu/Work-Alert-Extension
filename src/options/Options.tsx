import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { isJobs } from './atoms'
import { HashRouter, Route, Routes } from 'react-router-dom'
import HomeSection from './sections/HomeSection'
import ProfileSection from './sections/ProfileSection'
import Login from './sections/Login'

function App() {
  const [route, setRoute] = useState('')
  const [isClick, setIsClicked] = useRecoilState(isJobs)

  useEffect(() => {
    setRoute('home')
    chrome.runtime.onMessage.addListener((req) => {
      if (req.type === 'notification_clicked') {
        setRoute('home')
      }
    })
  }, [])

  useEffect(() => {}, [route])

  return (
    <HashRouter>
      <Routes>
        <Route index={true} path="/" element={<Login />} />
        <Route path="/home" element={<HomeSection />} />
        <Route path="/profile" element={<ProfileSection />} />
      </Routes>
    </HashRouter>
  )
}

export default App

//  <div className="bg-black text-white min-h-screen">
//       {!isClick && (
//         <>
//           <HeaderSection />
//           <RouteSection setRoute={setRoute} />
//         </>
//       )}

//       {route == 'home' ? (
//         <div className="py-4 flex flex-col gap-y-4">
//           <HomeSection />
//         </div>
//       ) : (
//         <div>
//           <ProfileSection />
//         </div>
//       )}
//     </div>
