import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { SimpleSpinner } from '../components/spinner';
import GenerateCertificate from '../components/GenerateCertificate';
import toast from 'react-hot-toast';
import { apiConnector } from '../services/apiconnector';

const DownloadCertificate = () => {

    const params = useParams();

    const [loadingCertificate, setLoadingCertificate] = useState(false)
    const [certaficateDetails, setCertaficateDetails] = useState({})

    useEffect(() => {        

        // console.log("Inside useEffect")
        const loadingCertificate = async() => {
            try {
                setLoadingCertificate(true);
                const certaficateDetails = await apiConnector("GET", `http://localhost:8000/api/v1/certificate/get-certificate/${params.id}`);
    
                console.log(certaficateDetails.data.data)
                setCertaficateDetails(certaficateDetails.data.data)
            } catch (error) {
                console.log(error);
                toast.error("Can't fetch certificate details")
            }
            finally {
                setLoadingCertificate(false);
            }
        }

        if(params?.id) {
            loadingCertificate();
        }

    }, [])


  return (
    <div className=' flex items-center justify-center h-[80vh] mx-auto '>
        {
            loadingCertificate ? 
            <div>
                <span class="loader"></span>
            </div> : 
            <div>
                {
                    certaficateDetails && 
                    <div className='flex flex-col h-full gap-y-2'>

                        <div className=' flex'>
                            <h1 className='text-3xl mx-auto text-white font-bold underline'><span className='underline'>{certaficateDetails.recipientName}{"'s"}</span> Certificate</h1>
                            {/* &nbsp; <span className='text-3xl text-white font-bold '></span> */}
                        </div>

                        <GenerateCertificate certaficateDetails={certaficateDetails}/>
                    </div>
                }
            </div>
        }
    </div>
  )
}

export default DownloadCertificate