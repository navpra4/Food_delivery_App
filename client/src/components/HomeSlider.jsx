import { motion } from 'framer-motion'
import React from 'react'
import { Slider} from "../components"

const HomeSlider = () => {
  return (
    <motion.div className=' w-full flex flex-col items-start justify-start'>
        <div className=' w-full flex items-center justify-between'>
            <div className=' flex flex-col items-start justify-start gap-1'>
                <p className=' text-2xl text-headingColor font-bold'>
                    Our Fresh & Healthy Fruits
                </p>
                <div className=' w-40 h-1 bg-orange-500 rounded-md'></div>
            </div>
        </div>
        <Slider/>
    </motion.div>

  )
}

export default HomeSlider