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

type prompt =
  | {
      key: string
      value: string
    }
  | {
      key: string
      value?: undefined
    }

export interface configProps {
  gpt_conversation_api: string
  gpt_session_api: string
  proposal_tone: { key: string; value: string }[]
  proposal_limit: { key: string; value: string }[]
  API_INTERVAL: number
  OAuth2Token: string
  prompt_list: prompt[]
  upwork_msg_url: string
  upwork_msg_ans_macro: string
}
