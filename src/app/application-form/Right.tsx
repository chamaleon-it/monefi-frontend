import React from 'react'
import Stage1 from './stage/Stage1'
import { ApplicationFormInterface } from '@/interface/ApplicationForm.interface'
import Stage2 from './stage/Stage2'
import Stage3 from './stage/Stage3'

interface PropsType {
    form:ApplicationFormInterface
}



export default function Right({form}: PropsType) {

const {stage} = form
  return (
    <div className='min-h-[calc(100vh-40vh)] h-full lg:min-h-screen  bg-monefi-off-white text-monefi-black w-full'>
       {stage ===1 && <Stage1 form={form}/>}
       {stage ===2 && <Stage2 form={form}/>}
       {stage ===2 && <Stage3 form={form}/>}
    </div>
  )
}
