import React, { useState } from 'react'

const ToggleScriptButton: React.FC = () => {

  let datafeed = document.querySelector('[data-test=tab-best-matches]') as HTMLElement
  let mostRecent = document.querySelector('[data-test=tab-most-recent]') as HTMLElement
  const [toggleScript, setToggleScript] = useState<boolean>(false)
  
  const sleep = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 100)
    })
  }
  
  function toggleHandler() {
    setToggleScript((prevState) => !prevState)
    toggleScriptHandler()
  }
  
  function toggleScriptHandler() {
    let intervalId = setInterval(async () => {
      datafeed.click()
  
      await sleep()
      mostRecent.click()
    }, 10000)
    if(!toggleScript) {
      clearInterval(intervalId)
    }
  }

  return (
    <button onClick={() => toggleHandler()} className="text-black font-medium py-2 px-4 rounded-md hover:text-green-600">
      Toggle Script {toggleScript ?"is On":"is Off"}
    </button>
  )
}
export default ToggleScriptButton
