import React from 'react'
import DBLeftSection from '../components/DBLeftSection'
import DBRightSection from '../components/DBRightSection'

const Dashboard = () => {
  return (
    <div className=' w-screen h-screen flex items-center bg-primary'>
        <DBLeftSection/>
        <DBRightSection/>
    </div>
  )
}

export default Dashboard