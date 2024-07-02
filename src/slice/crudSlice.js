import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
 import axiosInstance from "../helper/Helper"
 import 'react-toastify/dist/ReactToastify.css';
 import { toast } from 'react-toastify';
export const profileDetails=createAsyncThunk("/user/profile-details",async()=>{
    const res=await axiosInstance.get(`/user/profile-details`);
    const data=await res?.data
    return data
})
export const productList=createAsyncThunk("/product/list",async(formdata)=>{
    const res=await axiosInstance.post(`/product/list`,formdata);
    const data=await res?.data;
    return data
})
export const productDetails=createAsyncThunk("/product/detail",async(id)=>{
    const res=await axiosInstance.get(`/product/detail/${id}`);
    const data=await res?.data
    return data
})
export const productRemove=createAsyncThunk("/product/remove",async(formdata)=>{
    const res=await axiosInstance.post(`/product/remove`,formdata);
    const data=await res?.data
    return data
})
export const productUpdate=createAsyncThunk("/product/update",async(formdata)=>{
    const res=await axiosInstance.post(`/product/update`,formdata);
    const data=await res?.data
    return data
})
export const productCreate=createAsyncThunk("/product/create",async(formdata)=>{
    const res=await axiosInstance.post(`/product/create`,formdata);
    const data=await res?.data
    return data
})
export const crudSlice=createSlice({
    name:"crud",
    initialState:{
        details:[{}],
        list:[{}],
        isLoading:false,
        redirect:null,
        redirectupdate:null
    },
    reducers:{
            reset_redirectupdate:(state,{payload})=>{
                state.redirect=payload;
            },
            createlog:(state,{payload})=>{
                localStorage.removeItem("title")
            },
            updatelog:(state,{payload})=>{
                localStorage.removeItem("title")
            },
            reset_redirectTo:(state,{payload})=>{
                state.redirectupdate=payload;
            }
    },
    extraReducers:(builder)=>{
        builder
        // profileDetails 
        .addCase(profileDetails.pending,(state,action)=>{
            state.status="loading"
        })
        .addCase(profileDetails.fulfilled,(state,{payload})=>{
            state.status="idle";
            state.profile=payload?.data;
        })
        .addCase(profileDetails.rejected,(state,action)=>{
            state.status="idle"
        })
        // productList
        .addCase(productList.pending,(state,payload)=>{
            state.productlist="loading";
            state.isLoading=true;
        })
        .addCase(productList.fulfilled,(state,{payload})=>{
            if(payload.status===200){
                state.status="idle";
                state.list=payload?.data;
                state.isLoading=false;
            }else{
                if(payload?.status === 201){
                    toast(payload?.message+"   Create Product First");
                state.isLoading=false;

                }
            }
        })
        .addCase(productList.rejected,(state,action)=>{
            state.status="idle";
            state.isLoading=false;

        })
        // productDetails
        .addCase(productDetails.pending,(state,action)=>{
            state.status="loading"
            state.isLoading=true;
        })
        .addCase(productDetails.fulfilled,(state,{payload})=>{
            state.status="idle";
            state.details=payload?.data;
            state.isLoading=false;
        })
        .addCase(productDetails.rejected,(state,action)=>{
            state.status="idle";
            state.isLoading=false;

        })
        // productRemove
        .addCase(productRemove.pending,(state,action)=>{
            state.status="loading"
        })
        .addCase(productRemove.fulfilled,(state,{payload})=>{
            state.status="idle";
            state.total=payload?.data;
            toast.success(payload?.message)
            console.log(payload?.message)
        })
        .addCase(productRemove.rejected,(state,action)=>{
            state.status="idle";
            state.isLoading=false;

        })
        // productUpdate
        .addCase(productUpdate.pending,(state,action)=>{
            state.status="loading"
            state.isLoading=true;
        })
        .addCase(productUpdate.fulfilled,(state,{payload})=>{
            state.status="idle";
            localStorage.setItem("title",payload.data.title);
           toast.success(payload?.message)
           state.isLoading=false;
        })
        .addCase(productUpdate.rejected,(state,action)=>{
            state.status="idle";
            state.isLoading=false;

        })
        // productCreate
        .addCase(productCreate.pending,(state,action)=>{
            state.status="loading";
            state.isLoading=true;
        })
        .addCase(productCreate.fulfilled,(state,{payload})=>{
            state.status="idle";
            localStorage.setItem("title",payload?.data.title);
            state.redirectupdate=""
            state.redirect=""
            toast.success(payload?.message)
            state.isLoading=false;
        })
        .addCase(productCreate.rejected,(state,action)=>{
            state.status="idle";
            state.isLoading=false;

        })

    }
})
export const {reset_redirectTo,reset_redirectupdate,createlog,updatelog}=crudSlice.actions;
export default crudSlice.reducer;