import { useState } from 'react'
import { timeRange, truncate } from '../../../util'
import { jobsProps, keywordProps } from '../../../util/types'
import { clickedKeyword } from '../../atoms'
import { useRecoilState } from 'recoil'
import useOpJobs from '../../../customHooks/use-option-jobs'

const WorkCards: React.FC = () => {
  const [readMoreClicked, setReadMoreClicked] = useState(false)
  const { allJobs } = useOpJobs()
  const [clickKeyword, setIsClickKeyword] = useRecoilState(clickedKeyword)
  const [clickedValue, setClickedValue] = useState<string | undefined>('')
  let jobs = allJobs.find((keyword: keywordProps) => keyword.keyword === clickKeyword.keyword)?.jobs

  return (
    <div
      className={`grid grid-cols-3 grid-flow-row w-full flex-col gap-y-4 overflow-y-scroll max-h-[780px] py-2 gap-4`}
    >
      {jobs &&
        jobs.map((item: jobsProps) => (
          <div key={item.uid} className="text-green-500 bg-custom-bg  rounded-md p-5 h-auto">
            <div className="flex text-lg justify-between px-2 w-full text-gray-500">
              <div>
                {item.date && timeRange(item.date.toString()).type === 'minutes'
                  ? `${timeRange(item.date.toString()).range} minutes ago`
                  : timeRange(item.date.toString()).type === 'days'
                  ? `${timeRange(item.date.toString()).range} days ago`
                  : `${timeRange(item.date.toString()).range} hours ago`}
              </div>
              <div>{item.budget}</div>
            </div>
            <div className="text-white text-2xl pt-4 pl-4 font-extrabold">{item.title}</div>
            <div className="text-gray-400">
              <p className="text-16 pt-4 pl-4">
                {item.description && readMoreClicked && item.uid === clickedValue
                  ? item.description
                  : truncate(item.description)}
              </p>
            </div>
            <div
              onClick={() => {
                setReadMoreClicked((prev) => !prev)
                setClickedValue(item.uid)
              }}
              className="font-bold text-lg pl-4 mt-4 hover:cursor-pointer"
            >
              {readMoreClicked && item.uid === clickedValue ? (
                <a target="_blank" href={item.link}>
                  View Job Posting
                </a>
              ) : (
                'Read More'
              )}
            </div>
          </div>
        ))}
    </div>
  )
}

export default WorkCards
