import { useRecoilState } from 'recoil'
import AddKeyWordSection from './home/AddKeyWordSection'
import KeyWordsSection from './home/KeyWordsSection'
import { isJobs } from '../../atoms'
import WorkSection from './home/WorkSection'
import { useState } from 'react'
import BackToTop from '../commonComponent/BackToTop'

const HomeSection: React.FC = () => {
  const [isClick, setIsClicked] = useRecoilState(isJobs)

  return (
    <div className={`flex flex-col justify-center items-center  p-4 mx-auto`}>
      <BackToTop />
      {!isClick && <AddKeyWordSection />}

      <div className="py-4 flex flex-col gap-y-4">
        {!isClick && <KeyWordsSection />}
        {isClick && <WorkSection />}
      </div>
    </div>
  )
}

export default HomeSection
