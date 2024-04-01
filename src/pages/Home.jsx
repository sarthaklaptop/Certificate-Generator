import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../services/apiconnector';

const Home = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({number: ""})
  const [loading, setLoading] = useState(false)

  const { number } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Generating Certificate...");
    
    try {

      // const e
      
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
    <div>

        <div className=' flex items-center justify-center flex-col gap-10 h-[80vh] w-[80vw] mx-auto'>
          <h1 className='text-5xl font-bold text-orange-400'>Verify Certaficate</h1>

          <form 
            onSubmit={handleSubmit}
            className='w-[80%] gap-4 flex flex-col'
          >

          <input 
            required
            type="text"
            name='number'
            value={number}
            onChange={handleOnChange}
            placeholder='Your Name Email' 
            className=' bg-transparent border border-blue-600 p-2 rounded-lg'
          />

          <button 
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            type='submit'
          >
          Get Certificate
        </button>

          </form>
        </div>

    </div>
  )
}

export default Home