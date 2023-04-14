import { useRecoilState } from 'recoil'
import AddKeyWordSection from '../commonComponent/AddKeyWord'
import KeyWordsSection from './KeyWordsSection'
import { clickedKeyword, isJobs } from '../../atoms'
import WorkSection from './WorkSection'

const MainSection: React.FC = () => {
  const [isClick, setIsClicked] = useRecoilState(isJobs)
  const [clickKeyword, setIsClickKeyword] = useRecoilState(clickedKeyword)
  return (
    <div className="container flex flex-col justify-center p-4 mx-auto">
      <AddKeyWordSection />
      <div className="py-4 flex flex-col gap-y-4">
        {!isClick && <KeyWordsSection />}
        {isClick && <WorkSection props={clickKeyword} />}
      </div>
    </div>
  )
}

export default MainSection
