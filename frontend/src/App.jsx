import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import LandingPage from './pages/LandingPage'
import Authentication from './pages/Authentication'
import { AuthProvider } from './contexts/AuthContext';
import VideoMeet from './pages/VideoMeet'
import HomeComponent from './pages/home';
import History from './pages/history'

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/auth' element={<Authentication/>}/>
          <Route path='/:url' element={<VideoMeet/>}/>
             <Route path='/home's element={<HomeComponent />} />
             <Route path='/history' element={<History/>} />
        </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
