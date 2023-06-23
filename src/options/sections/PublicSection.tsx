import React, { useEffect, useState } from 'react'
import { useSupabase } from '../../customHooks/use-supabase'
import { BinIcon, PenIcon } from '../../util/Icons'
import MainLayout from '../layouts/main-layout'
import { proposalsProps } from '../../util/types'

const PublicSection: React.FC<{}> = () => {
  const [allProfiles, setAllProfiles] = useState<any>()
  const { getAllProfiles } = useSupabase()

  useEffect(() => {
    getAllProfiles().then((response: any) => {
      setAllProfiles(response)
    })
  }, [])

  return (
    <MainLayout>
      <div className="w-2/6 mx-auto my-6">
        <header className="text-2xl text-white font-bold">Public Profiles</header>
        {allProfiles?.map((item: any, index: number) => (
          <div
            key={index}
            className="bg-custom-bg h-16 py-4 px-4 my-3 flex rounded-md justify-between"
          >
            <div className="text-lg">{item.profile}</div>
            <div className="text-lg">{item.name}</div>
          </div>
        ))}
      </div>
    </MainLayout>
  )
}

export default PublicSection
