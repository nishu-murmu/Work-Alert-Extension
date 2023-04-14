import AddKeyWordSection from '../commonComponent/AddKeyWord'
import KeyWordsSection from './KeyWordsSection'

const MainSection: React.FC = () => {
  return (
    <div className="container flex flex-col justify-center p-4 mx-auto">
      <AddKeyWordSection />
      <div className="py-4 flex flex-col gap-y-4">
        <KeyWordsSection />
        {/* <WorkSection /> */}
      </div>
    </div>
  )
}

export default MainSection
