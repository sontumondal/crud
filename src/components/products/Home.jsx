import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { handleLoggedout } from '../../slice/authSlice';

const Home = () => {
const token=localStorage.getItem("token");
const dispatch=useDispatch()

const logout=()=>{
  dispatch(handleLoggedout())

}

  return (
    <>
    <br />
    <br />
   <Card className="home">
    <CardContent>
      <Typography variant='h2' color="Highlight">
        WelCome To Our Todo App
      </Typography>
      <Typography variant='h6' color="ButtonHighlight">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem corrupti at, sint ratione id sequi error voluptates voluptatum ad. Commodi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus obcaecati dolorum, sapiente eligendi reiciendis officia ad deleniti perspiciatis dolores necessitatibus!
      </Typography>
    </CardContent>
      <CardActions>
      {token ? (<NavLink to="/login">
        <Button variant='contained' size='large' color='warning' onClick={logout} >
        Logout</Button></NavLink>):
      (
        <NavLink to="/login">
        <Button variant='contained' size='large' color='success' >
        Login</Button></NavLink>
      )
      }
        
      </CardActions>
      <CardActions>
        <Button onClick={()=> {window.location.reload()}}>refresh</Button>
      </CardActions>
   </Card>
   </>
  )
}

export default Home
