import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { singnupregister } from '../slice/authSlice'
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from 'react-router-dom';
const Register = () => {
  const [image,setImage]=useState("")
    const {isLoading}=useSelector(state => state?.Auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {register,handleSubmit,formState:{errors}}=useForm()
    const onSubmit=(data)=>{
      const formData=new FormData();
      formData.append("first_name",data?.first_name);
      formData.append("last_name",data?.last_name);
      formData.append("email",data?.email);
      formData.append("password",data?.password);
      formData.append("profile_pic",image);
        dispatch(singnupregister(formData))
        if(formData){
          navigate("/login");
        }
    }
  return (
    <>
        

     <div className="loginform">
     
     
    <Container >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{ margin: "2rem auto"}}>
          <Paper elevation={3} sx={{ padding: 4 }} >
            <Typography variant="h5" gutterBottom>
            Register
            </Typography>
            <form>
              <TextField
               {...register("first_name",{
        required:true,
        minLength:4,
        maxLength:12,
      })}
                label="First Name"
                fullWidth
                margin="normal"
                variant="outlined"
                error={errors?.first_name}
                helperText={errors?.first_name?.type === "required" && (<>"First name is required"</>)}

              />
              {/* {errors?.first_name?.type === "required" && (<p>First name is required</p>)} */}
      {errors?.first_name?.type === "minLength" && (<p>Character should not be less than 4</p>)}
      {errors?.first_name?.type === "maxLength" && (<p>Character should not be greater than 12</p>)}
              <TextField
              {...register("last_name",{
        required:true,
        minLength:4,
        maxLength:12,
      })}
                label="Last Name"
                fullWidth
                margin="normal"
                variant="outlined"
                error={errors?.last_name}
                helperText={errors?.last_name?.type === "required" && (<>"Last name is required"</>)}


              />
               {errors?.last_name?.type === "minLength" && (<p>Character should not be less than 4</p>)}
      {errors?.last_name?.type === "maxLength" && (<p>Character should not be greater than 12</p>)}
              <TextField
                {...register("email",{
            required:"Email is required",
            pattern:{
                value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                message:"It's not a valid email",
            }
        })}
                label="Your Email"
                fullWidth
                margin="normal"
                variant="outlined"
                error={errors.email}
                helperText={errors.email && errors.email.message}

              />
              <TextField
             
             {...register("password",{
            required:"Password is required",
            pattern:{
                value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                
            }
            
        })}
                label="password"
                fullWidth
                margin="normal"
                variant="outlined"
                multiline
                // rows={4}
                error={errors.password}
                // helperText={errors.password && "Password is required"}
                helperText={errors.password && (<>{errors?.password?.message}</>)}
                
              />
              {errors?.password?.type === "pattern" && (<p>Must one Capital letter</p>)}
        {errors?.password?.type === "pattern" && (<p>Must one special Character</p>)}
        {errors?.password?.type === "pattern" && (<p>Must one number </p>)}
        {errors?.password?.type === "pattern" && (<p>should not be less than 8</p>)}
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
                 ( "")
                 }
{isLoading ? ( <Button
                variant="outlined"
                color="primary"
                fullWidth
                size="large"
                
                sx={{ marginTop: 2 }}
              >
                Sign-in !...please wait 
              </Button>): ( <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                type="submit"
                onClick={handleSubmit(onSubmit)}
                sx={{ marginTop: 2 }}
              >
                Register
              </Button>)}
             
            </form>
            <Typography  sx={{ marginTop: 2 }}>You have already an account ! Login now ...<NavLink to="/login">Login</NavLink></Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </div>
   
    </>
  )
}

export default Register
