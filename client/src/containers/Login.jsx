import {React, useState, useEffect} from 'react'
import { LoginBg ,logo } from '../assets'
import LoginInput from '../components/LoginInput'
import { FaEnvelope , FaLock, FcGoogle} from '../assets/icons'
import {motion} from "framer-motion"
import { buttonClick } from '../animations'
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import {app} from "../config/firebase.config"
import { validateUserJWTToken } from '../api'
import { setUserDetails } from '../context/actions/userActions'
import { alertInfo, alertWarning} from "../context/actions/alertActions"

const Login = () => {

  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setpassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state)=> state.user)
  const alert = useSelector((state)=> state.alert)

  useEffect(() => {
    if(user){
      navigate("/", { replace: true})
    }
  }, [user])
  

  const loginWithGoogle =  async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred)=>{
        if(cred){
          cred.getIdToken().then((token)=>{
            validateUserJWTToken(token).then(data =>{
              dispatch(setUserDetails(data));
            });
          navigate("/", { replace:true})  
          });
        }
      });
    });
  };

  const signUpWithEmailPass = async() => {
    if(userEmail==="" || password ==="" || confirm_password===""){
     dispatch(alertInfo('Reqiured fields should not be Empty'))
    }else{
      if(password===confirm_password){
        setConfirm_password= "";
        setUserEmail= "";
        setpassword= "";
        await createUserWithEmailAndPassword(firebaseAuth, userEmail, password).then((userCred)=>{
          firebaseAuth.onAuthStateChanged((cred)=>{
            if(cred){
              cred.getIdToken().then((token)=>{
                validateUserJWTToken(token).then(data =>{
                  dispatch(setUserDetails(data));
                });
              navigate("/", { replace:true})  
              });
            }
          });
        });
    }else{
      dispatch(alertWarning('Password doesnot match'))
      }
    }
  };

  const signInWithEmailPass = async()=>{
    if(userEmail!=="" && password!==""){
    await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then((userCred)=>{
      firebaseAuth.onAuthStateChanged((cred)=>{
        if(cred){
          cred.getIdToken().then((token)=>{
            validateUserJWTToken(token).then(data =>{
              dispatch(setUserDetails(data));
            });
          navigate("/", { replace:true})  
          });
        }
      });
    })
  }else{
    dispatch(alertWarning('Password doesnot match'))
  }
  }
  return (
    <div className = " w-screen h-screen relative overflow-hidden flex">
        <img className = " w-full h-full absolute object-cover top-0 left-0" src={LoginBg} alt=''/>
        <div className = " flex flex-col items-center bg-blend-overlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
          <div className="flex items-center justify-start gap-4 w-full">
            <img src={ logo } className=" w-8" alt="" />
            <p className=" text-headingColor text-2xl font-semibold"> Foodies Paradise</p>
          </div>

          {/* welcome */}
          <p className="text-headingColor text-2xl font-semibold">Welcome Back</p>
          <p className="text-textColor text-1xl -mt-6">{isSignUp? "Sign up": "Sign in"} with the following</p>

          {/* input */}
          <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
            <LoginInput 
              placeholder={"Email here"} 
              icon={<FaEnvelope className=' text-xl text-textColor'/>} 
              inputState={userEmail} 
              inputStateFunction={setUserEmail} 
              type={"email"} 
              isSignUp={isSignUp}
            />
            <LoginInput 
              placeholder={"Password here"} 
              icon={<FaLock className=' text-xl text-textColor'/>} 
              inputState={password} 
              inputStateFunction={setpassword} 
              type={"password"} 
              isSignUp={isSignUp}
            />

            {isSignUp && 
            <LoginInput 
              placeholder={"Confirm password here"} 
              icon={<FaLock className=' text-xl text-textColor'/>} 
              inputState={confirm_password} 
              inputStateFunction={setConfirm_password} 
              type={"password"} 
              isSignUp={isSignUp}
            />}

            {!isSignUp? 
            <p> Doesn't have an account: {""}   
              <motion.button {...buttonClick} 
              className=' text-blue-400 bg-transparent cursor-pointer underline'
              onClick={()=>setIsSignUp(true)}>
              Create one
              </motion.button>
            </p>: 
            <p> Already have an account: {""}   
              <motion.button {...buttonClick} 
              className=' text-blue-400 bg-transparent cursor-pointer underline'
              onClick={()=>setIsSignUp(false)}>
              Sign-in here
              </motion.button>
            </p>
            }

            {/* button section */}
            {isSignUp?
            (
              <motion.button {...buttonClick}
                className='w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl captilize hover:bg-red-500 transition-all duration-150'
                onClick={signUpWithEmailPass}>
              Sign Up
            </motion.button>
            ):(
              <motion.button {...buttonClick}
                className='w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl captilize hover:bg-red-500 transition-all duration-150'
                onClick={signInWithEmailPass}>
              Sign in
            </motion.button>
            )}
          </div>

          <div className=' flex items-center justify-between gap-16 '>
            <div className=' w-24 h-[1px] rounded-md bg-white'></div>
            <p className=' text-white'> or </p>
            <div className=' w-24 h-[1px] rounded-md bg-white'></div>
          </div>

          <motion.div {...buttonClick}
          className=' flex items-center justify-center bg-slate-50 px-20 py-2 backdrop-blur-md cursor-pointer rounded-3xl gap-4'
          onClick={loginWithGoogle}>
            <FcGoogle className='text-3xl'/>
            <p className=' text-headingColor capitalize text-base'>Sign in with Google</p>
          </motion.div>
            
        </div>
    </div>
  )
}

export default Login