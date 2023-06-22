import { QueryProps, configProps } from './types'

export const config: configProps = {
  gpt_conversation_api: 'https://chat.openai.com/backend-api/conversation',
  gpt_session_api: 'https://chat.openai.com/api/auth/session',
  API_INTERVAL: 3,
  OAuth2Token: 'http://304843596099-0hqqp6hggjf17uq8fshgd8tbe18mtqmk.apps.googleusercontent.com/',
  proposal_tone: [
    {
      key: 'select',
      value: 'Select Tone',
    },
    {
      key: 'formal',
      value: 'Formal',
    },
    {
      key: 'informal',
      value: 'In-Formal',
    },
    {
      key: 'neutral',
      value: 'Neutral',
    },
    {
      key: 'friendly',
      value: 'Friendly',
    },
  ],
  proposal_limit: [
    {
      key: 'default',
      value: 'Select Range of words',
    },
    {
      key: 'approx_50',
      value: 'Approx 50',
    },
    {
      key: 'app_100',
      value: 'Approx 100',
    },
    {
      key: 'app_150',
      value: 'Approx 150',
    },
    {
      key: 'app_200',
      value: 'Approx 200',
    },
  ],
  prompt_list: [
    {
      key: 'Rephrase',
      value: 'Rephrase the below text',
    },
    {
      key: 'Explain',
      value: 'Explain this below text',
    },
    {
      key: 'Summarize',
      value: 'Summarize this below text',
    },
    {
      key: 'Custom',
    },
  ],
  SUPABASE_KEY:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9neXBpdHVhb2h1eXRzdnFnYXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc0MDc4MTAsImV4cCI6MjAwMjk4MzgxMH0.rhnYnHfQz-VncAxi7v_EhXHu5q3erGrrwsdtVdiGkLw',
  SUPABASE_URL: 'https://ogypituaohuytsvqgaqb.supabase.co',
  upwork_msg_url: 'https://www.upwork.com/ab/messages/rooms',
  upwork_msg_ans_macro: `
I have been working with #{client_name} on upwork project
Below is the my recent upwork conversation with #{client_name}

"""#{formattedString}"""

#{message}
`,
}

export function proposalQuery(query: QueryProps) {
  const result: string[] = [
    `Name: ${query?.name}\nSkills: ${query?.skills}\nExperience: ${query.experience}\nInbuilt Proposal: ${query?.proposal}\nClient Name: ${query?.client}`,
    `Client Job Description: ${query?.job_description}`,
    `Extract pain points from client job description and write a cover letter using the Inbuilt Proposal ${
      query.tone ? 'in a ' + query?.tone + ' tone' : ''
    }${
      query.range_of_words
        ? ' and it should not exceed more than ' + query?.range_of_words.split('_')[1] + ' words'
        : ''
    }.`,
    `${query?.optional_info ? ` Additional Instructions: ${query?.optional_info}` : ''}`,
  ].filter(Boolean)

  return result
}
