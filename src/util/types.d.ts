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

export interface proposalsProps {
  profile: string
  proposal: string
  name: string
  experience: string
  skills: string
  portfolio?: string
  client?: string
  prebuilt?: string
}

export interface QueryProps extends proposalsProps {
  tone: string
  range_of_words: string
  optional_info?: string
  job_description: string
}

export interface ModalProps {
  toggleModal: boolean
  setTogggleModal: (newValue: boolean | ((prevValue: boolean) => boolean)) => void
}