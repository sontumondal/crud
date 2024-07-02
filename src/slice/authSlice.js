import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../helper/Helper'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export const singnupregister=createAsyncThunk("/user/signup",
async(formData)=>{
const res=await axiosInstance.post(`/user/signup`,formData)
const data=await res?.data;
return data;
})

export const login=createAsyncThunk("/user/signin",
    async(formData)=>{
        const res=await axiosInstance.post(`/user/signin`,formData)
        const data=await res?.data;
        return data;
    }
)

export const authSlice=createSlice({
    name:"Auth",
    initialState:{
        isloggedIn: false,
  redirectTo: null,
  SetToken: "",
  redirectToo: null,
  isLoading:false,
    },
    reducers:{
        reset_redirectTo:(state,{payload})=>{
            state.redirectTo=payload
        },
        reset_redirectToo:(state,{payload})=>{
            state.redirectToo=payload;
        },
        check_token:(state,{payload})=>{
          let token=localStorage.getItem("token");
          if(token !== null && token !== undefined){
            state.isloggedIn=true
          }else{
            state.isloggedIn=false;
          }
        },
        handleLoggedout:(state,{payload})=>{
            localStorage.removeItem("token")
            localStorage.removeItem("Name")
            localStorage.removeItem("image")
            localStorage.removeItem("title");
            state.isloggedIn=false;
            toast.success("Logout Successfully");

        },handleRegister:(state,{payload})=>{
            localStorage.removeItem("name")
        },
    },
    extraReducers:(builer)=>{
        builer
        .addCase(singnupregister.pending,(state,action)=>{
            state.status="loading";
            state.isLoading=true;
           
        })
        .addCase(singnupregister.fulfilled,(state,{payload})=>{
            state.state="idle";
            if(payload?.status === 200){
                state.isloggedIn=true;
                localStorage.setItem("Name",payload?.data?.first_name);
                localStorage.setItem("image",payload?.data?.profile_pic);
                state.redirectToo="/login";
                toast.success(payload?.message)
                console.log(payload?.message);
                state.isLoading=false;
            }else{
                if(payload?.status === 201){
                    toast.error(payload?.message)
                    console.log(payload?.message)
                state.isLoading=false;

                }
            }
        })
        .addCase(singnupregister.rejected,(state,action)=>{
            state.status="idle"
        })
        .addCase(login.pending,(state,action)=>{
            state.status="loading";
            state.isLoading=true;
        })
        .addCase(login.fulfilled,(state,{payload})=>{
            if(payload?.status === 200){
                state.login_status="idle";
                state.redirectTo="/productlist";
                state.isloggedIn=true;
                localStorage.setItem("token", payload?.token);
                localStorage.setItem("Name", payload?.data?.first_name);
                localStorage.setItem("image", payload?.data?.profile_pic);
                toast.success(payload?.message)
                console.log(payload?.message)
                state.isLoading=false;
            }else{
                if(payload?.status === 201){
                    toast.error(payload?.message)
                    console.log(payload?.message)
                state.isLoading=false;

                }
            }
        })
        .addCase(login.rejected,(state,{payload})=>{
           console.log("check server")
        })
    }
});


export const {reset_redirectTo,reset_redirectToo,check_token,handleLoggedout,handleRegister}=authSlice.actions;
export default authSlice.reducer;