import { configProps } from "./types";

export const config: configProps = {
    gpt_conversation_api: "https://chat.openai.com/backend-api/conversation",
    gpt_session_api: 'https://chat.openai.com/api/auth/session',
    API_INTERVAL: 3,
    OAuth2Token: "http://304843596099-0hqqp6hggjf17uq8fshgd8tbe18mtqmk.apps.googleusercontent.com/",
    prompt_list: [{
        key: 'Rephrase',
        value: 'Rephrase the below text'
    },
    {
        key: 'Explain',
        value: 'Explain this below text'
    }, 
    {
        key: 'Summarize',
        value: 'Summarize this below text'
    },{
        key: 'Custom'
    }]
}