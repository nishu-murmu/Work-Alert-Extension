import { HashRouter, Route, Routes } from 'react-router-dom'
import HomeSection from './sections/HomeSection'
import ProfileSection from './sections/ProfileSection'
import SignUpSection from './sections/SignUpSection'
import LoginSection from './sections/LoginSection'
import PublicSection from './sections/PublicSection'

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
