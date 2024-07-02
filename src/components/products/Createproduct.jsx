import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { productCreate } from '../../slice/crudSlice'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
const Createproduct = () => {
const [image,setImage]=useState("")
const {isLoading}=useSelector(state => state.crud)

const {register,handleSubmit,formState:{errors}}=useForm()

const dispatch=useDispatch()
const onSubmit=(data)=>{
  const formData=new FormData()
  formData.append("title",data?.title);
  formData.append("description",data?.description)
  formData.append("image",image)
 dispatch(productCreate(formData))
}
  return (
    <> 
<br />
<br />
<br />
<br />
<br />
      <div className="">
     
     
    <Container >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{ margin: "2rem auto"}}>
          <Paper elevation={3} sx={{ padding: 6 }} >
            <Typography variant="h5" gutterBottom>
            PRODUCT-CREATE
            </Typography>
            <form>
              <TextField
               {...register("title",{required:"Title should not empty"})}
                label="Title"
                fullWidth
                margin="normal"
                variant="outlined"
                error={errors.title}
                helperText={errors.title && errors.title.message}
              />
              <TextField
             
             {...register("description",{required:"Provide product Description"})}
                label="Description"
                fullWidth
                margin="normal"
                variant="outlined"
                multiline
                // rows={4}
                error={errors.description}
                helperText={errors.description && "Password is required"}
              />
            <input type="file" 
              onChange={(e)=> setImage(e.target.files[0])}
              name="image"
             accept="image/*"
            />
             {image !== "" && image !== undefined && image !== null ? (
                    <img
                      height="40px"
                      src={URL.createObjectURL(image)}
                      alt=""
                      className="upload-img"
                    />
                  )  : 
                ""
                 }
{isLoading ? ( <Button
                variant="outlined"
                color="primary"
                fullWidth
                size="large"
                
                sx={{ marginTop: 2 }}
              >
                Create !...please wait 
              </Button>): ( <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                type="submit"
                onClick={handleSubmit(onSubmit)}
                sx={{ marginTop: 2 }}
              >
                Create
              </Button>)}
             
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </div>
    </>
  )
}

export default Createproduct
