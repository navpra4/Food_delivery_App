import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useSelector} from "react-redux"
import { staggerFadeInOut} from "../animations"
import { MdFastfood} from "../assets/icons"
import { statuses} from "../utils/styles"
import { SliderCard} from "../components"

const FilterSection = () => {
  const [Category, setCategory] = useState("fruits")
  const products = useSelector(state => state.products)  


  return (
    <motion.div className=' w-full flex flex-col items-start justify-start'>
        <div className=' w-full flex items-center justify-between'>
            <div className=' flex flex-col items-start justify-start gap-1'>
                <p className=' text-2xl text-headingColor font-bold'>
                    Our Hot Dishes
                </p>
                <div className=' w-40 h-1 bg-orange-500 rounded-md'></div>
            </div>
        </div>
        
        <div className=' w-full overflow-x-scroll pt-6 flex items-center justify-center gap-6 py-8'>
            {statuses && 
                statuses.map((data,i)=>(
                    <FilterCard
                        data ={data}
                        Category={Category}
                        setCategory={setCategory}
                        index={i}
                    />
                ))            
            }
        </div>

        <div className=' w-full flex items-center justify-evenly flex-wrap gap-4 mt-12'>
            { products &&
                products
                    .filter((data)=> data.product_category === Category)
                    .map((data,i)=> <SliderCard key ={i} data={data} index={i} />)
            }
        </div>
    </motion.div>
  )
}

export const FilterCard = ({data, index, Category, setCategory})=>{
    return(
        <motion.div key={index} {...staggerFadeInOut(index)} className={`group w-28 min-w-[128px] cursor-pointer rounded-md py-6 ${ Category === data.category ? " bg-red-500 ": " bg-primary"} hover:bg-red-500 shadow-md flex flex-col items-center justify-center gap-4`}
        onClick={()=> setCategory(data.category)}>
            <div className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center group-hover:bg-primary ${ Category === data.category ?" bg-primary":" bg-red-500" }`}>
                <MdFastfood className={`${ Category === data.category ? " text-red-500" : " text-primary"} group-hover:text-red-500`}/>
            </div>
            <p className={`text-xl font-semibold ${ Category === data.category ? " text-primary":" text-textColor"} group-hover:text-primary`}>
                {data.title}
            </p>
        </motion.div>
    )
} 

export default FilterSection