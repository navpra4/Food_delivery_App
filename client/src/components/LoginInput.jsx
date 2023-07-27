import { motion } from 'framer-motion'
import {React , useState} from 'react'
import { fadeInOut } from '../animations'


const LoginInput = ({placeholder, icon, inputState, inputStateFunction , type , isSignUp}) => {

  const [isFocus, setisFocus] = useState(false)
  return (
    <motion.div
      {...fadeInOut}
      className= {`flex items-center gap-4 bg-slate-50 justify-center backdrop-blur-md rounded-md px-4 py-2 w-full ${isFocus? "shadow-md shadow-red-400" : "shadow-none"}`}>
        {icon}
        <input 
          type={type} 
          placeholder={placeholder} 
          className=' w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none'
          value={inputState}
          onChange= {(e)=> inputStateFunction(e.target.value)}
          onFocus={()=>setisFocus(true)}
          onBlur={()=>setisFocus(false)}
        />
    </motion.div>
  )
}

export default LoginInput