"use client"

import React from 'react'
import Left from './Left'
import Right from './Right'
import useApplicationForm from './useApplicationForm';



export default function Form() {
    const form = useApplicationForm();
  return (
    <div className='flex flex-col lg:flex-row'>
        <Left stage={form.stage}/>
        <Right form={form}/>
    </div>
  )
}
