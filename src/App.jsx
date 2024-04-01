import { useState } from 'react'
import './App.css'
import Certificate from './pages/Certificate'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import DownloadCertificate from './pages/DownloadCertificate'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=' '>
      <video className="bg-video" src="/background.mp4" autoPlay loop muted></video>
      <Navbar/>

      <div>
        <Routes>
          
            <Route path="/" element={<Home />} />
            <Route path="/create-certificate" element={<Certificate />} />
            <Route path="/certaficate/:id" element={<DownloadCertificate />} />
        
        </Routes>
      </div>
    </div>
  )
}

export default App
