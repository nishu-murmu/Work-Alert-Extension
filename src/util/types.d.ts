type IconProps = {
  className?: string
  strokeWidth?: number
  strokeColor?: string
  fillColor?: string
}

type keywordProps = {
  rssLink?: string
  keyword?: string
  jobs?: jobsProps[]
}
export interface jobsProps {
  budget?: string
  title: string
  description: string
  hourly?: string
  date: Date
}
