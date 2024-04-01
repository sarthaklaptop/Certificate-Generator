import React from 'react'
import { useGenerateCertificate } from '../hooks/useGenerateCertificate'

const GenerateCertificate = ({certaficateDetails}) => {

  // const certificateDetails = certificateDetails

  // console.log(`certaficateDetails from GenerateCertaficate.tsx: \n ${certaficateDetails}`)

  const { certificatePdfUrl, certificateImageUrl } = useGenerateCertificate(certaficateDetails)

  // console.log(`certificatePdfUrl: ${certificatePdfUrl}`)

  // console.log(certaficateDetails)

  return (
    <div className=' h-[70vh] w-[70vw] overflow-hidden'>
      {
        certificatePdfUrl ? (
          <>
            <object width="100%" height="100%" data={certificatePdfUrl} type='application/pdf'> </object>
          </>
        ) : (
          <div>
            <span class="loader"></span>
          </div>
        )
      }
    </div>
  )
}

export default GenerateCertificate