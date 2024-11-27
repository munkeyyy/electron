import React from 'react'
import NavBar from './Components/Common/NavBar.jsx'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './Components/Dashboard.jsx'
import Sidebar from './Components/Common/Sidebar.jsx'
import MyLibrary from './Components/MyLibrary.jsx'
import Notifications from './Components/Notifications.jsx'
import Billing from './Components/Billing.jsx'
import Settings from './Components/Settings.jsx'

export default function App() {
  return (
    <div className='bg-black h-screen max-h-full'>
      {/* <NavBar/> */}
      <div className='flex items-start justify-start w-full h-full'>

      <Sidebar/>
      <Routes>
        <Route path="*" element={<Navigate to={"/"} replace />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/mylibrary" element={<MyLibrary />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      </div>
    </div>
  )
}
