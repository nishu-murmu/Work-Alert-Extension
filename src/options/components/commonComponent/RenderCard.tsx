import { useState } from "react"
import { timeRange, truncate } from "../../../util"
import { jobsProps } from '../../../util/types'

const RenderCard = ({ item }: { item: jobsProps }) => {
  const [showMore, setShowMore] = useState(false)

  return (
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