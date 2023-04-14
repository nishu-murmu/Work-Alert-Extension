import { useRecoilState } from 'recoil'
import WordCard from '../commonComponent/WorkCard'
import { clickedKeyword, isJobs } from '../../atoms'

const WorkSection = (props: any) => {
  const [isClick, setIsClicked] = useRecoilState(isJobs)
  const [clickKeyword, setIsClickKeyword] = useRecoilState(clickedKeyword)
  console.log(clickKeyword)
  return (
    <>
      <div className="text-2xl flex justify-center gap-x-6">
        <div className="hover:cursor-pointer" onClick={() => setIsClicked((prev) => !prev)}>
          Go Back
        </div>
        <div>{clickKeyword.jobs.length}</div>
        <div>{clickKeyword.keyword}</div>
      </div>
      <div id="keywords" className="w-4/5 mx-auto justify-center">
        <WordCard props={props} />
      </div>
    </>
  )
}
export default WorkSection
