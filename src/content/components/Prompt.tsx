import React from 'react'

const InjectedPrompt:React.FC = () => {
    return (
        <div className='absolute w-80 flex flex-col gap-y-3 px-2 py-4 m-1 border border-gray-500 rounded-md bg-custom-bg text-white'>
            <div>Send direct to GPT.</div>
            <div>Rephrase the selected.</div>
        </div>
    )
}
export default InjectedPrompt