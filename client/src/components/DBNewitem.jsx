import {React, useState} from 'react'
import { statuses } from '../utils/styles'
import {Spinner} from '../components'
import { FaCloudUploadAlt, MdDelete } from '../assets/icons'
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../config/firebase.config'
import { useDispatch, useSelector } from 'react-redux'
import { alertDanger, alertNull, alertSuccess} from "../context/actions/alertActions"
import { motion } from 'framer-motion'
import { buttonClick } from '../animations'
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { addNewProduct, getAllProducts } from '../api'
import {setAllProducts} from "../context/actions/productActions"

const LinearProgressWithLabel = (props)=> {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const DBNewitem = () => {
  const [ItemName, setItemName] = useState("")
  const [category, setCategory] = useState(null)
  const [price, setPrice] = useState("")
  const [isloading, setIsloading] = useState(false)
  const [progress, setProgress] = useState(null)
  const [imageDownloadURL, setimageDownloadURL] = useState(null)
  const dispatch = useDispatch()
  const alert = useSelector(state => state.alert)

  const deleteImageFromFirebase = ()=>{
    setIsloading(true);
    const deleteRef = ref(storage, imageDownloadURL);

    deleteObject(deleteRef).then(()=>{
      setimageDownloadURL(null);
      setIsloading(false)
      dispatch(alertSuccess("Image deleted from the cloud"))
          setTimeout(() => {
            dispatch(alertNull())
          }, 3000);
    })
  };

  const submitNewData = ()=>{
    const data ={
      product_name : ItemName,
      product_category : category,
      product_price : price,
      imageURL : imageDownloadURL,
    }
    addNewProduct(data).then((res)=>{
      dispatch(alertSuccess("New Item added"));
      setTimeout(() => {
        dispatch(alertNull());
      }, 3000);
      setimageDownloadURL(null);
      setItemName("");
      setPrice("");
      setCategory(null);
    })
    getAllProducts().then((data)=>{
      dispatch(setAllProducts(data));
    })
  };

  const uploadImage =(e)=>{
    setIsloading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on('state_changed', 
      (snapshot)=>{
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      }, 
      (error)=>{
        dispatch(alertDanger(`Error : ${error}`))
        setTimeout(() => {
          dispatch(alertNull())
        }, 3000);
      }, 
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimageDownloadURL(downloadURL)
          setIsloading(false)
          setProgress(null)
          dispatch(alertSuccess("Image uploaded to the cloud"))
          setTimeout(() => {
            dispatch(alertNull())
          }, 3000);
      })}
      );


  }

  return (
    <div className=' flex items-center justify-center flex-col pt-6 px-24 w-full'>
      <div className=' border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4'>
        <InputValueField
          type="text"
          placeHolder={"Item name here"}
          stateFunction={setItemName}
          stateValue={ItemName}
        />
        <div className=' w-full flex items-center justify-around gap-3 flex-wrap'>
          {statuses && statuses?.map(data =>(
          <p key={data.id} className={`px-4 py-3 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${ data.category === category? "bg-red-400 text-primary" : " bg-transparent" }`}
          onClick={()=>setCategory(data.category)}>{data.title}</p>
          ))}
        </div>
        <InputValueField
          type="number"
          placeHolder={"Item price here"}
          stateFunction={setPrice}
          stateValue={price}
        />
        <div className=' w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer'>
            {isloading? 
              <div className=' w-full h-full flex items-center justify-evenly flex-col px-24'>
                <Spinner/>
                <Box sx={{ width: '100%' }}>
                    <LinearProgressWithLabel value={progress} />
                </Box>
              </div>:( 
              <>
              { !imageDownloadURL? (
                <>
                  <label>
                    <div className=' flex flex-col items-center justify-center h-full w-full cursor-pointer'>
                      <div className=' flex flex-col justify-center items-center cursor-pointer'>
                        <p className=' font-bold text-4xl'>
                          <FaCloudUploadAlt className=' -rotate-0'/>
                        </p>
                        <p className=' text-lg text-textColor'> 
                          Click to upload an image
                        </p>
                      </div>
                    </div>
                    <input 
                      type="file"
                      name="upload-image"
                      accept="image/*"
                      onChange={uploadImage}
                      className=' w-0 h-0'
                    />
                  </label>
                </> ):(
                <>
                  <div className=' relative w-full h-full overflow-hidden rounded-md'>
                    <motion.img
                      whileHover={{scale:1.15}}
                      src={imageDownloadURL}
                      className=' w-full h-full object-cover'
                    />

                    <motion.button
                      {...buttonClick}
                      type=' button'
                      className=' absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out'
                      onClick={()=>{deleteImageFromFirebase(imageDownloadURL)}}
                    >
                      <MdDelete className=' -rotate-0'/>
                    </motion.button>
                  </div>
                </> )
              }
              </>)}
        </div>

        <motion.button
          onClick={submitNewData}
          {...buttonClick}
          className=' w-9/12 py-2 rounded-md bg-red-400 text-primary hover:bg-red-500 cursor-pointer' 
        >
          Save 
        </motion.button>
      </div>
    </div>
  )
}

export const InputValueField =({type, placeHolder, stateValue, stateFunction})=>{
  return(
    <>
      <input
        type={type}
        placeholder={placeHolder}
        className=' w-full px-4 py-3 bg-white shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400'
        value={stateValue}
        onChange={(e)=> stateFunction(e.target.value)}
      />
    </>
  )
}

export default DBNewitem