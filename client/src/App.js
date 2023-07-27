import React, { useEffect, useState } from 'react'
import {Route , Routes} from "react-router-dom"
import { Main , Login, Dashboard} from "./containers"
import {getAuth} from "firebase/auth"
import {app} from "./config/firebase.config"
import {getAllCartItems, validateUserJWTToken} from "./api"
import {useDispatch, useSelector} from "react-redux"
import {setUserDetails} from "./context/actions/userActions"
import { fadeInOut } from './animations'
import { motion } from 'framer-motion'
import { Alert } from './components'
import { setCartItems } from './context/actions/cartAction'

const App = () => {

  const firebaseAuth = getAuth(app);
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false)
  const alert = useSelector((state) => state.alert)

  useEffect(()=>{
    setisLoading(true)
    firebaseAuth.onAuthStateChanged((cred)=>{
      if(cred){
        cred.getIdToken().then((token)=>{
          validateUserJWTToken(token).then(data =>{
            if(data){
              getAllCartItems(data.user_id).then((items)=>{
                console.log(items);
                dispatch(setCartItems(items));
              })
            }
            dispatch(setUserDetails(data));
          });
        });
      }
      setInterval(() => {
        setisLoading(false);
      }, 3000);
    });
  },[])

  return (
    <div className= "w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {isLoading && (
      <motion.div {...fadeInOut} className="z-50 inset-0 bg-gray-100 backdrop-blur-md fixed flex items-center justify-center w-full"> 
        Loading...
      </motion.div>
      )}
      <Routes>
        <Route path="/*" element={<Main/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/dashboard/*' element={<Dashboard/>}/>
      </Routes>
      <Alert type = {"success"} message={"hi"}/>
      {alert?.type && <Alert type={alert?.type} message={alert?.message} />} 
    </div>
  )
}

export default App