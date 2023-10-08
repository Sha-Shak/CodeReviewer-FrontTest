import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'

const SlatePage = () => {
  return (
    <div className="slateBody">
      <Navbar/>
      <div className="container">

      <Outlet/>
      </div>
    </div>
  )
}

export default SlatePage;