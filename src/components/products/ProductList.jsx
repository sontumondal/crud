import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productList, productRemove } from '../../slice/crudSlice'
import ProductDetails from './ProductDetails'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { product } from '../../helper/Helper'
import { Link, NavLink } from 'react-router-dom'
import Alert from '../sweetalert/Alert'




const ProductList = () => {
  const {list}=useSelector(state => state?.crud)
  // console.log(list)
  const dispatch=useDispatch()
  useEffect(()=>{
  dispatch(productList())
  },[])
const [delete_id,setDelete_id]=useState("")
const [isDelete, setIsDelete] = useState(false);

const handleDelete=(id)=>{
  const formData=new FormData();
  formData.append("id",delete_id);
  if(delete_id !== ""){
  dispatch(productRemove(formData)).then(()=>{
    dispatch(productList())
  })
  }
  setDelete_id("");
  setIsDelete(false);
 
}

  return (
<>
<Paper sx={{ width: '90%',margin:" auto",paddingTop:"7rem",paddingBottom:"4rem", overflow: 'hidden' }}>
<NavLink to="/createproduct"><Button variant='contained'>Goto Product Create</Button></NavLink>
     <TableContainer component={Table}>
      <Table sx={{ minWidth:400}} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell><Button variant='outlined'>SL.No</Button></TableCell>
            <TableCell align="left"> <Button variant='outlined'>Image</Button> </TableCell>
            <TableCell align="left"> <Button variant='outlined'>Title</Button></TableCell>
            <TableCell align="left"> <Button variant='outlined'>Descripton</Button></TableCell>
            <TableCell align="left"> <Button variant='outlined'>Update</Button></TableCell>
            <TableCell align="left"> <Button variant='outlined'>Delete</Button></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list?.map((item,index) => (
            <TableRow hover 
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index +1}
              </TableCell>
              <TableCell align="left"><img src={product(item.image)} alt="" width="50px" height="50px"/></TableCell>
              <TableCell align="left">{item.title}</TableCell>
              <TableCell align="left">{item.description}</TableCell>
              <TableCell align="left"><Link to={`/update/${item._id}`}><Button variant='contained' size='small'>
              Update</Button></Link></TableCell>
              <TableCell align="left"><Button variant='contained' color='warning' size='small'
              onClick={()=>{setDelete_id(item?._id);
              setIsDelete(true);}}
              >Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
    {isDelete && (
        <Alert
          confirm={handleDelete}
          cancle={() => setIsDelete(false)}
         
        />
      )}
    </>
  )
}

export default ProductList
