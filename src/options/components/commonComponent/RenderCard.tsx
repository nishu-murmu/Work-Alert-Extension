import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { timeRange, truncate } from '../../../util'
import { jobsProps } from '../../../util/types'
import { newJobs } from '../../atoms'

const RenderCard = ({ item, flag }: { item: jobsProps; flag: boolean }) => {
  const [showMore, setShowMore] = useState(false)
  const [newCurrentJobs, setNewCurrentJobs] = useRecoilState(newJobs)
  const [isJobNew, setIsJobNew] = useState(false)

  useEffect(() => {
    console.log({ newCurrentJobs }, 'ms')
    const flag = newCurrentJobs.filter((elem: any) => elem.uid == item.uid)
    console.log({ flag })
    if (flag.length > 0) {
      setIsJobNew(true)
    } else setIsJobNew(false)
  }, [newCurrentJobs])

  {
    budget: null
    date: '2023-04-21T09:01:00.000Z'
    description: 'I need shopify website redesign with 50 hot products + premium theme + SEO + payment setup + live chat'
    hourly: '$20.00-$45.00\n\n'
    keyword: 'sddg'
    link: 'https://www.upwork.com/jobs/Shopify-store-redesign-shopify-website-design_%7E01caceb5b141ded7af?source=rss'
    notification_triggered: false
    title: 'Shopify store redesign shopify website design'
    uid: 'https://www.upwork.com/jobs/Shopify-store-redesign-shopify-website-design_%7E01caceb5b141ded7af?source=rss'
    __seen: false
  }
  return (
    <div
      key={item.uid}
      className={`text-green-500 bg-custom-bg  rounded-md p-5 h-auto ${
        isJobNew ? 'border border-green-500' : ''
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
