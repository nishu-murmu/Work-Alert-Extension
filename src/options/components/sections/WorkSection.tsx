import { useRecoilState } from 'recoil'
import WordCard from '../commonComponent/WorkCard'
import { clickedKeyword, isJobs } from '../../atoms'
import { ArrowLeftIcon } from '../../../util/Icons'

const WorkSection = (props: any) => {
  const [isClick, setIsClicked] = useRecoilState(isJobs)
  const [clickKeyword, setIsClickKeyword] = useRecoilState(clickedKeyword)
  return (
    <>
      <div className="text-2xl flex justify-between w-4/5 mx-auto">
        <div
          className="flex gap-x-4 hover:cursor-pointer"
          onClick={() => setIsClicked((prev) => !prev)}
        >
          <span className="mt-1">
            <ArrowLeftIcon />
          </span>
          <span>Go Back</span>
        </div>
        <div className="flex gap-x-2">
          <span>{clickKeyword.jobs.length}</span>
          <span>{clickKeyword.keyword}</span>
        </div>
      </div>
      <div id="keywords" className="w-4/5 mx-auto justify-center">
        <WordCard props={props} />
      </div>
    </>
  )
}
export default WorkSection
