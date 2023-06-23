import { HashRouter, Route, Routes } from 'react-router-dom'
import HomeSection from './sections/home/HomeSection'
import ProfileSection from './sections/profile/ProfileSection'
import SignUpSection from './sections/signUp/SignUpSection'
import LoginSection from './sections/login/LoginSection'
import PublicSection from './sections/public/PublicSection'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route index={true} path="/" element={<LoginSection />} />
        <Route path="/register" element={<SignUpSection />} />
        <Route path="/home" element={<HomeSection />} />
        <Route path="/profile" element={<ProfileSection />} />
        <Route path="/public" element={<PublicSection />} />
      </Routes>
    </HashRouter>
  )
}

export default App
