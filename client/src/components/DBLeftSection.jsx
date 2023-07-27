import React from 'react'
import { NavLink } from 'react-router-dom'
import { logo } from '../assets'
import { isActiveStyles, isNotActiveStyles } from '../utils/styles'

const DBLeftSection = () => {
  return (
    <div className=' h-full py-12 flex flex-col bg-white backdrop-blur-md shadow-md min-w-210 w-300 gap-3'>
      <NavLink to={"/"} className=" flex items-center justify-start px-6 gap-4"> 
            <img src={logo} className=" w-12" alt="" />
            <p className=' font-semibold text-xl'>Foodies Paradise</p>
       </NavLink>

       <hr/>

       <ul className=' flex flex-col gap-4'>
        <NavLink className={({isActive})=> isActive? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` : isNotActiveStyles} to={"/dashboard/home"}>Home</NavLink>
        <NavLink className={({isActive})=> isActive? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` : isNotActiveStyles} to={"/dashboard/orders"}>Orders</NavLink>
        <NavLink className={({isActive})=> isActive? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` : isNotActiveStyles} to={"/dashboard/items"}>Items</NavLink>
        <NavLink className={({isActive})=> isActive? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` : isNotActiveStyles} to={"/dashboard/newItem"}>Add New item</NavLink>
        <NavLink className={({isActive})=> isActive? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500` : isNotActiveStyles} to={"/dashboard/users"}>Users</NavLink>
       </ul>
    </div>
  )
}

export default DBLeftSection