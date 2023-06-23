import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { isJobs } from './atoms'
import { HashRouter, Route, Routes } from 'react-router-dom'
import HomeSection from './sections/HomeSection'
import ProfileSection from './sections/ProfileSection'
import SignUpSection from './sections/SignUpSection'
import LoginSection from './sections/LoginSection'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route index={true} path='/' element={<LoginSection />} />
        <Route path='/register' element={<SignUpSection />} />
        <Route path='/home' element={<HomeSection />} />
        <Route path='/profile' element={<ProfileSection />} />
      </Routes>
    </HashRouter>
  )
}

export default App
