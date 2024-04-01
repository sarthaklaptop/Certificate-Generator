import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { ApiResponse } from '../../backend/src/utils/ApiResponse'
import { apiConnector } from '../services/apiconnector'

const Certificate = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })

  const { name, email } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    // alert(`name : ${name} email : ${email}`)
    setLoading(true);
    const toastId = toast.loading("Generating Certificate...");
    
    try {
      
      const response = await apiConnector("POST", 'http://localhost:8000/api/v1/certificate/create-certaficate', formData)
      console.log("inside try")

        console.log(`response:-`, response)

        if(!response.data.success) {
          toast.error(response.data.message)
          throw new Error(response.data.message)
        }

        const CertaficateNumber = await response.data.data.certificateNumber;

        console.log(CertaficateNumber)

        toast.success("Certeficate Created Successfully");
        
        navigate(`/certaficate/${CertaficateNumber}`)
        
      } catch (error) {
        console.log("Error in creating certificate", error)
        toast.error("Can't create certificate")
      }
      setLoading(false)
      toast.dismiss(toastId)

  }

  return (
    <div className=' flex items-center justify-center flex-col gap-10 h-[80vh] w-[80vw] mx-auto'>
      <h1 className='text-5xl font-bold text-orange-400'>
        Generate your Certificate
      </h1>

      <form 
        onSubmit={handleSubmit}
        className='w-[80%] gap-4 flex flex-col'
        >
        <div className=' flex flex-col gap-4  text-white'>
          <input 
            required
            type="text"
            name='name'
            value={name}
            onChange={handleOnChange}
            placeholder='Your Name' 
            className=' bg-transparent border border-blue-600 p-2 rounded-lg'
          />
          <input 
            required
            type="email" 
            name='email'
            value={email}
            onChange={handleOnChange}
            placeholder='Enter Your Email' 
            className=' bg-transparent border border-blue-600 p-2 rounded-lg'
          />
        </div>

        <button 
          className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          type='submit'
        >
          Generate Certificate
        </button>
      </form>
  
        
      
    </div>
  )
}

export default Certificate