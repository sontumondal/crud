import React, { Suspense, lazy, useEffect } from 'react'
import {BrowserRouter as Router , Routes, Route, Navigate} from "react-router-dom"
import Footer from './components/Footer'
import { useDispatch } from 'react-redux'
import { check_token } from './slice/authSlice'

// import ProductDetails from './components/products/ProductDetails'
const Login =lazy(()=> import("./components/Login")) 
const Register = lazy(()=> import("./components/Register")) 
const Home =lazy (()=> import('./components/products/Home'))
const ProductList  =lazy (()=> import('./components/products/ProductList'))
const MyNavbar =lazy (()=>import('./components/MyNavbar')) 
const Createproduct = lazy (()=>import('./components/products/Createproduct'))
const UpdateProduct =lazy (()=> import('./components/products/UpdateProduct'
))
const App = () => {
  const dispatch=useDispatch()
  const Privateroute=({children})=>{
    let token=localStorage.getItem("token") || sessionStorage.getItem("token")
   return token !== null && token !== undefined ? ( children ) : (
      <>
      <Navigate to="/"/>
      {alert("please go through login either you cant access product list")}
      </>
    )
  }

  const PublicRouteName=[
    {path:"/login", component:<Login/>},
    {path:"/register", component:<Register/>},
    {path:"/", component:<Home/>},
  ]
  const PrivateRouteName=[
    {path:"/productlist" , component:<ProductList/>},
    {path:"/createproduct" , component:<Createproduct/>},
    {path:"/update/:id" , component:<UpdateProduct/>},
  
  ];

  useEffect(()=>{
    dispatch(check_token())
  },[dispatch])
  return (
    <>
    <Suspense fallback={<h4>Loading...</h4>}>
     <Router>
     <MyNavbar/>
      <Routes>
        {PublicRouteName?.map((route,index)=>(
        <Route path={route.path} element={route.component}/>
        ))}
        {PrivateRouteName?.map((route,index)=>(
          <Route path={route.path}  element={<Privateroute>{route.component}</Privateroute>}/>
        ))}
      </Routes>
      <Footer/>
     </Router>
     </Suspense>
    </>
  )
}

export default App
