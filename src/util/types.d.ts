type IconProps = {
  className?: string
  strokeWidth?: number
  strokeColor?: string
  fillColor?: string
}

type keywordProps = {
  rssLink?: string
  keyword: string
  jobs?: jobsProps[]
}
export interface jobsProps {
  budget: string | null
  keyword: string
  title: string
  description: string
  hourly: string | null
  date: string
  uid?: string
  link: string
  guid?: string
  notification_triggered: boolean
}
