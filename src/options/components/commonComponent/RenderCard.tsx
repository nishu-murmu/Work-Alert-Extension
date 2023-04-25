import { useEffect, useState } from 'react'
import useOpJobs from '../../../customHooks/use-option-jobs'
import { timeRange, truncate } from '../../../util'
import { jobsProps } from '../../../util/types'

const RenderCard = ({ item, flag }: { item: jobsProps; flag: boolean }) => {
  const [showMore, setShowMore] = useState(false)
  const [isJobNew, setIsJobNew] = useState(false)
  const { getNewComingJobs } = useOpJobs()

  useEffect(() => {
    getNewComingJobs().then((res: any) => {
      const flag = res.filter((elem: any) => elem.uid == item.uid)
      if (flag?.length) {
        setIsJobNew(true)
      } else setIsJobNew(false)
    })

  }, [])


  return (
    <div
      key={item.uid}
      className={`text-green-500 bg-custom-bg overflow-hidden  rounded-md p-5 h-auto ${isJobNew ? 'border border-green-500' : ''
        }`}
    >
      <div className="flex text-lg justify-between px-2 w-full text-gray-500">
        <div>
          {item.date && timeRange(item.date.toString()).type === 'minutes'
            ? `${timeRange(item.date.toString()).range} minutes ago`
            : timeRange(item.date.toString()).type === 'days'
              ? `${timeRange(item.date.toString()).range} days ago`
              : `${timeRange(item.date.toString()).range} hours ago`}
        </div>
        <div>{item.budget ? item.budget : item.hourly && `${item.hourly.trim()}`}</div>
      </div>
      <div className="text-white text-2xl pt-4 pl-4 font-extrabold">{item.title}</div>
      <div className="text-gray-400">
        <p className="text-16 pt-4 pl-4">
          {item.description && showMore ? item.description : truncate(item.description)}
        </p>
      </div>
      <div
        onClick={() => {
          setShowMore(true)
        }}
        className="font-bold text-lg pl-4 mt-4 hover:cursor-pointer"
      >
        {showMore ? (
          <a target="_blank" href={item.link}>
            View Job Posting
          </a>
        ) : (
          'Read More'
        )}
      </div>
    </div>
  )
}

export default RenderCard
