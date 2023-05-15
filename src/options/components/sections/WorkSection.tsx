import { useRecoilState } from 'recoil'
import WordCards from '../commonComponent/WorkCard'
import { clickedKeyword, isJobs, selectedFilter } from '../../atoms'
import { ArrowLeftIcon } from '../../../util/Icons'
import useOpJobs from '../../../customHooks/use-option-jobs'
import { keywordProps } from '../../../util/types'
import { compareArrays } from '../../../util'
import { ChangeEvent, useEffect, useRef } from 'react'

const WorkSection = () => {
  const [isClick, setIsClicked] = useRecoilState(isJobs)
  const [clickKeyword, setIsClickKeyword] = useRecoilState(clickedKeyword)
  const [_, setSelectedFilter] = useRecoilState(selectedFilter)
  const { allJobs, getNewComingJobs, removeSeenJobs } = useOpJobs()
  const backRef = useRef<HTMLButtonElement>(null)

  let jobs = allJobs.find((keyword: keywordProps) => keyword.keyword === clickKeyword.keyword)?.jobs

  const removeSeen = async () => {
    const newCurrentJobs: any = await getNewComingJobs()
    if (newCurrentJobs) {

      const newJobs: any = compareArrays(jobs, newCurrentJobs)

      removeSeenJobs(newJobs)
    }
  }

  const clickToGoBack = (e: any) => {
    if (e.key === "Backspace") {
      backRef.current?.click()
    }
  }

  const filterHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    chrome.storage.local.set({ filter: e.target.value }, () => {
    setSelectedFilter(e.target.value)
    })
  }

  useEffect(() => {
    document.addEventListener("keydown", clickToGoBack)

    return () => {
      document.removeEventListener("keydown", clickToGoBack)
    }
  }, [])

  return (
    <div className="max-w-[1300px]">
      <div className="flex items-center justify-between px-2">
        <div
          className="flex gap-x-4 hover:cursor-pointer group"
          onClick={() => setIsClicked((prev) => !prev)}
        >
          <span className="mt-1">
            <ArrowLeftIcon className="group-hover:text-gray-400" />
          </span>
          <button ref={backRef} onClick={() => removeSeen()} className="text-2xl group-hover:text-gray-400">
            Go Back
          </button>
        </div>
        <div className="flex text-2xl pl-8">
          <span className="p-1">{clickKeyword.keyword}</span>
        </div>
        <div className='flex gap-x-2'>
        <div className='font-semibold text-lg pt-1'>Sort By:</div>
        <select onChange={(e: ChangeEvent<HTMLSelectElement>) => filterHandler(e)} className='text-white text-lg cursor-pointer px-4 py-2 rounded-md bg-custom-bg' name="filters" id="filters">
        <option value="default">Select Filters</option>
          <option value="budget">Budget</option>
          <option value="time">Time</option>
        </select>
      </div>
      </div>
      

      <div id="keywords" className="flex items-center mt-3 justify-center">
        <WordCards />
      </div>
    </div>
  )
}
export default WorkSection
