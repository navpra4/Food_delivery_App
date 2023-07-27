import { motion } from 'framer-motion'
import React from 'react'
import { Delivery, heroBg } from '../assets'
import { buttonClick, staggerFadeInOut } from '../animations'
import { randomData } from '../utils/styles'
import { BsCurrencyRupee } from 'react-icons/bs'

const Home = () => {
  return (
    <motion.div className=' w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className=' flex flex-col items-start justify-start gap-6'>
            <div className=' px-4 py-1 flex items-center justify-center gap-2 bg-orange-100 rounded-full'>
                <p className=' text-lg font-semibold text-orange-500'> Free Delivery</p>
                <div className=' w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-md'> 
                    <img src={Delivery} alt="" className=' w-full h-full object-contain'/>
                </div>
            </div>

            <p className=' text-[]40px md:text-[72px] text-headingColor font-sans font-extrabold tracking-wider'>The Fastest Delivery in <span className=' text-orange-600'> Your City</span></p>

            <p className=' text-textColor text-lg'>
            Our mission is to elevate the quality of life for the urban consumer with unparalleled convenience.
            For over a decade now, we’ve been empowering our customers in discovering new tastes and experiences across countries.  We aim to be the most accessible platform on the network - reimagining the meaning of convenience in the country through a variety of service offerings.
            </p>

            <motion.button
              {...buttonClick}
              className=' bg-gradient-to-bl from-orange-400 to-orange-600 px-4 py-2 rounded-xl text-black text-base font-semibold'
            >
                Order Now
            </motion.button>
        </div>
        <div className=' py-2 flex-1 flex items-center justify-end relative'>
            <img src={heroBg} alt="" className=' absolute top-0 -right-25 md: w-full h-420 md:h-650'/>

            <div className=' w-full md:w-460 ml-0 flex flex-wrap items-center justify-center gap-4 gap-y-14'>
                {randomData && randomData.map((data,i)=>(
                    <motion.div 
                      {...staggerFadeInOut}
                      className=' w-32 h-36 md:h-auto md:w-190 p-4 bg-white backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg'>
                        <img src={data.imageURL} alt="" className='w-12 h-12 md:w-32 md:h-32 md:-mt-16 object-contain ' />
                        <p className=' text-sm lg:text-xl font-semibold text-textColor'>
                            {data.product_name.slice(0,14)}
                        </p>
                        <p className=' text-[12px] text-center font-semibold md:text-base text-lighttextGray capitalize'>
                            {data.product_category}
                        </p>
                        <p className=' texxt-sm font-semibold text-headingColor flex items-center '>
                            <BsCurrencyRupee className='text-xs text-red-600'/>
                            {data.product_price}
                        </p>

                    </motion.div>
                ))}

            </div>
        </div>
    </motion.div>
  )
}

export default Home