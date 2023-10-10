import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'

const SlatePage = () => {
  return (
    <div className="slateBody">
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default SlatePage;