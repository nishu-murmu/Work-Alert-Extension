import { useRecoilState } from 'recoil'
import AddKeyWordSection from '../commonComponent/AddKeyWord'
import KeyWordsSection from './KeyWordsSection'
import { isJobs } from '../../atoms'
import WorkSection from './WorkSection'
import { useState } from 'react'
import BackToTop from '../commonComponent/BackToTop'

const MainSection: React.FC = () => {
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

export default MainSection
