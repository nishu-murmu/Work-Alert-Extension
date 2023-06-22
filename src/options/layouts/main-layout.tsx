import HeaderSection from '../sections/HeaderSection'

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-black text-white min-h-screen">
      <HeaderSection />
      {children}
    </div>
  )
}
export default MainLayout
