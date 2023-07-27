import {React , useState} from 'react'
import {Link, NavLink, useNavigate} from "react-router-dom"
import{ logo } from "../assets" 
import { isActiveStyles, isNotActiveStyles } from '../utils/styles'
import { motion } from 'framer-motion'
import { buttonClick, slideTop } from '../animations'
import {MdLogout, MdShoppingCart } from "../assets/icons"
import { useDispatch, useSelector } from 'react-redux'
import {Avatar} from '../assets'
import { getAuth } from 'firebase/auth'
import { app } from '../config/firebase.config'
import { setUserNull } from '../context/actions/userActions'
import {setCartOn} from "../context/actions/displayCartAction"

const Header = () => {

  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const [isMenu, setIsMenu] = useState(false);
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOut = ()=>{
    firebaseAuth.signOut()
    .then(()=>{
      dispatch(setUserNull());
      navigate("/login" , {replace: true})
    })
    .catch((err)=>{console.log(err)});
  }

  return (
    <header className=' fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-6 '>
       <NavLink to={"/"} className=" flex items-center justify-center gap-4"> 
            <img src={logo} className=" w-12" alt="" />
            <p className=' font-semibold text-xl'>Foodies Paradise</p>
       </NavLink>

       <nav className='flex items-center justify-center gap-8'>
            <ul className=' hidden md:flex items-center justify-center gap-16'>
                <NavLink className={({isActive})=> isActive? isActiveStyles : isNotActiveStyles} to={"/"}>Home</NavLink>
                <NavLink className={({isActive})=> isActive? isActiveStyles : isNotActiveStyles} to={"/menu"}>Menu</NavLink>
                <NavLink className={({isActive})=> isActive? isActiveStyles : isNotActiveStyles} to={"/services"}>Services</NavLink>
                <NavLink className={({isActive})=> isActive? isActiveStyles : isNotActiveStyles} to={"/aboutus"}>About us</NavLink>
            </ul>
            <motion.div {...buttonClick} className=' relative cursor-pointer' onClick={()=>dispatch(setCartOn())}>
              <MdShoppingCart className=' text-3xl text-textColor'/>
              {cart?.length > 0 && (
                <div className=' w-6 h-6 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 -right-1'>
                <p className=' text-primary text-base font-semibold'>
                  {cart?.length}
                </p>
              </div>
              )}
            </motion.div>
            {user?
              (<>
                <div className=' relative cursor-pointer' onMouseEnter={()=>{setIsMenu(true)}}>
                  <div className=' w-12 h-12 rounded-full shadow-md overflow-hidden cursor-pointer flex items-center justify-center'>
                    <motion.img 
                      className=' w-full h-full object-cover' 
                      src={ user?.picture ? user?.picture : Avatar}
                      whileHover={{scale: 1.15}}
                      referrerPolicy='no-referrer'
                    />
                  </div>

                  {isMenu && (
                    <motion.div 
                    onMouseLeave={()=>setIsMenu(false)}
                    {...slideTop}
                    className='px-6 py-4 w-48 bg-white backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col gap-4'>
                    <Link
                      className=' hover:text-red-500 text-xl text-textColor' to={"/dashborad/home"}
                    >
                      Dashboard
                    </Link>
                    <Link
                      className=' hover:text-red-500 text-xl text-textColor' to={"/profile"}
                    >
                      My Profile
                    </Link>
                    <Link
                      className=' hover:text-red-500 text-xl text-textColor' to={"/user-orders"}
                    >
                      Orders
                    </Link>
                    <hr/>

                    <motion.div
                      {...buttonClick}
                      className=' group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3'
                      onClick={signOut}
                    >
                      <MdLogout className='text-2xl text-textColor group-hover:: text-headingColor'/>
                      <p> Signout</p>
                    </motion.div>
                  </motion.div>
                  )}

                </div>
              </>):
              (<>
                <NavLink to={"/"}>
                  <motion.button {...buttonClick} className=' px-4 py-2 rounded-md shadow-md bg-white border-red-300 cursor-pointer'>
                    Login
                  </motion.button>
                </NavLink>
              </>)}  
       </nav>
    </header>
  )
}

export default Header