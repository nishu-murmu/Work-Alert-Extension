import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderSection from './sections/HeaderSection'
import RouteSection from './sections/RouteSection'

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showRoute, setShowRoute] = useState<boolean>(false)
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user?.id) {
      setShowRoute(true)
    } else {
      setShowRoute(false)
    }
  }, [])
  return (
    <div className="bg-black text-white min-h-screen">
      <HeaderSection />
      {showRoute && <RouteSection />}
      {children}
    </div>
  )
}
export default MainLayout
