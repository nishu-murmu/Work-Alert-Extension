import React, { useEffect, useState, useRef } from 'react'

const ToggleScriptButton: React.FC = () => {
  const intervalIdRef = useRef<any>(null)
  const [toggleScript, setToggleScript] = useState<boolean>(false)

  function toggleHandler() {
    setToggleScript((prevState) => !prevState)
  }

  function toggleScriptHandler() {
    let datafeed = document.querySelector('[data-test=tab-best-matches]') as HTMLElement
    let mostRecent = document.querySelector('[data-test=tab-most-recent]') as HTMLElement
    const sleep = () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(true), 100)
      })
    }
    intervalIdRef.current = setInterval(async () => {
      datafeed.click()

      await sleep()
      mostRecent.click()
    }, 10000)
  }
  function stopScriptHandler() {
    clearInterval(intervalIdRef.current)
  }

  useEffect(() => {
    toggleScript ? toggleScriptHandler() : stopScriptHandler()
  }, [toggleScript])

  return (
    <button
      onClick={() => toggleHandler()}
      className={`btn ${toggleScript ? 'enabled' : 'disabled'}`}
    >
      Most Recent {toggleScript ? 'Enabled' : 'Disabled'}
    </button>
  )
}
export default ToggleScriptButton
