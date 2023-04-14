import { jobsProps } from '../../../util/types'

const WorkCard = ({ budget, title, description, hourly, date }: jobsProps) => {
  return (
    <div className="flex flex-col overflow-y-scroll h-[440px] gap-y-4">
      {
        <div className="text-green-500 bg-custom-bg  rounded-md p-5 h-auto">
          <div className="flex text-lg justify-between px-2 w-full text-gray-500">
            <div>{JSON.stringify(date)}Hours Ago</div>
            <div>{budget}</div>
          </div>
          <div className="text-white text-2xl pt-4 pl-4 font-extrabold">{title}</div>
          <div className="text-gray-400">
            <p className="text-16 pt-4 pl-4">{description}</p>
          </div>
          <div className="font-bold text-lg pl-4 mt-4 hover:cursor-pointer">Read More</div>
        </div>
      }
    </div>
  )
}

export default WorkCard
