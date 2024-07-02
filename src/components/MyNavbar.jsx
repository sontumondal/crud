import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {NavLink, useNavigate} from "react-router-dom"
import { handleLoggedout } from '../slice/authSlice'
import {profile_pic} from "../helper/Helper"
import { profileDetails } from '../slice/crudSlice'
import { Button } from "@mui/material"
const MyNavbar = () => {
  const token=localStorage.getItem("token")
 const Name=localStorage.getItem("Name")
  const {isloggedIn}=useSelector(state => state?.Auth)
  const image=localStorage.getItem("image");
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const logout=()=>{
    dispatch(handleLoggedout());
    navigate("/")
  }
  useEffect(()=>{
    dispatch(profileDetails())
  },[])
  const [name,setName]=useState("");
  useEffect(()=>{
    setName(Name)
  },[Name])
  
  return (
    <>

<div className="navcontainer">
  <div className="icon">
    <img src="./public/vite.svg" alt="" />
    <p>Hello React</p>
  </div>
  <div className="link">
    <NavLink to="/">
    Home</NavLink>
    <NavLink to="/productlist">ProductList</NavLink>
  </div>
  <div className="logout">

      {isloggedIn && token ? <><img src={profile_pic(image)} alt="hghjk" className='profileimage'/></> : ""}
      {isloggedIn && token ?  <Button variant='text' sx={{color:"white"}}>Hello: {name} &nbsp; &nbsp; &nbsp;</Button>:""}
      {isloggedIn && token ? <Button variant='outlined' color='warning' size='small' onClick={logout}>Logout</Button> :""}
  </div>
</div>
   

    
    </>
  )
}

export default MyNavbar
