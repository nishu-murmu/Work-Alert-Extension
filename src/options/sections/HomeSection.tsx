import { useRecoilState } from 'recoil'
import AddKeyWordSection from './home/AddKeyWordSection'
import KeyWordsSection from './home/KeyWordsSection'
import { isJobs } from '../atoms/index'
import WorkSection from './home/WorkSection'
import BackToTop from '../components/commonComponent/BackToTop'
import MainLayout from '../layouts/main-layout'
import { withAuth } from '../components/HOC/withAuth'

const HomeSection: React.FC = () => {
  const [isClick, setIsClicked] = useRecoilState(isJobs)

  return (
    <MainLayout>
      <div className={`flex flex-col justify-center items-center  p-4 mx-auto`}>
        <BackToTop />
        {!isClick && <AddKeyWordSection />}

        <div className="py-4 flex flex-col gap-y-4">
          {!isClick && <KeyWordsSection />}
          {isClick && <WorkSection />}
        </div>
      </div>
    </MainLayout>
  )
}

export default withAuth(HomeSection)
