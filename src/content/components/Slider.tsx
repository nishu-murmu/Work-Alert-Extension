import React from 'react'
import { CrossIcon } from '../../util/Icons'
import { toggleSliderState } from '../atom'
import { useRecoilState } from 'recoil'

const Slider: React.FC = () => {
  const [toggleSlider, setToggleSlider] = useRecoilState(toggleSliderState)

  return (
    <div className='right-2 absolute px-4 py-2 h-screen w-2/6 bg-black text-white'>
      <div className='header-section flex'>
        <span onClick={() => setToggleSlider(prev => !prev)}>
          <CrossIcon className='mt-2 h-12 w-12 m-2 hover:cursor-pointer' strokeColor='green' />
        </span>
        <h2 className='text-3xl m-4 text-green-600 font-extrabold'>Write a Proposal</h2>
      </div>
      <div className='main-section'>
        <div className='flex w-full px-4'>
          <select
            name='keywords'
            className=' w-full py-3 px-2 hover:cursor-pointer rounded-lg text-black'
            id='keywords'
          >
            <option value='select_profile'>Select Profile</option>
            <option value='react'>React</option>
            <option value='react_native'>React Native</option>
          </select>
        </div>
        <div className='my-2 px-4 flex gap-x-4 group'>
          <input className='group-hover:cursor-pointer' type='checkbox' id='inbuilt'/>
          <label className='mt-1 group-hover:cursor-pointer pt-2' htmlFor='inbuilt'>Use the inbuilt proposal.</label>
        </div>
        <div className='grid w-full px-4 my-3 h-10 text-black grid-cols-2 gap-x-2'>
          <select name='tone' id='tone' className='py-3 px-2 rounded-lg'>
            <option value='select'>Select Tone</option>
            <option value='formal'>Formal</option>
            <option value='formal'>Formal</option>
            <option value='informal'>InFormal</option>
            <option value='neutral'>Neutral</option>
            <option value='friendly'>Friendly</option>
          </select>
          <select name='limit' id='limit' className='py-3 px-2 rounded-lg'>
            <option value='app_250'>Select Range of words</option>
            <option value='app_250'>Approx 250</option>
            <option value='app_350'>Approx 350</option>
            <option value='app_500'>Approx 500</option>
          </select>
        </div>
        <div className='px-4 w-full'>
        <button className='w-full rounded-lg bg-green-700 text-white py-2' id='submit'>Submit to GPT</button>
        </div>
        <div className='w-full px-4 my-2'>
          <label className=' text-white font-semibold' htmlFor='proposal'>
            Generated Proposal:
          </label>
          <textarea
            name='proposal'
            id='proposal'
            className='rounded-lg w-full text-black p-3'
            cols={30}
            rows={10}
          ></textarea>
        </div>
        <div className='px-4 mt-2 w-full'>
          <button className='w-full bg-green-600 py-2 rounded-lg'>Fill</button>
        </div>
      </div>
    </div>
  )
}

export default Slider
