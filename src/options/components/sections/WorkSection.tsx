import { useRecoilState } from 'recoil'
import WordCards from '../commonComponent/WorkCard'
import { clickedKeyword, isJobs } from '../../atoms'
import { ArrowLeftIcon } from '../../../util/Icons'

const WorkSection = () => {
  const [isClick, setIsClicked] = useRecoilState(isJobs)
  const [clickKeyword, setIsClickKeyword] = useRecoilState(clickedKeyword)
  return (
    <div className="max-w-[1300px]">
      <div className="text-2xl flex items-center justify-between">
        <div
          className="flex gap-x-4 hover:cursor-pointer group"
          onClick={() => setIsClicked((prev) => !prev)}
        >
          <span className="mt-1">
            <ArrowLeftIcon className="group-hover:text-gray-400" />
          </span>
          <span className="group-hover:text-gray-400">Go Back</span>
        </div>
        <div className="flex gap-x-2">
          <span className="p-1">{clickKeyword.keyword}</span>
        </div>
      </div>
      <div id="keywords" className="flex items-center mt-3 justify-center">
        <WordCards />
      </div>
    </div>
  )
}
export default WorkSection
