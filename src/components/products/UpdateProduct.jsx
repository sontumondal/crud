import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productDetails, productUpdate } from "../../slice/crudSlice";

import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [form, setForm] = useState({});
  const [image, setImage] = useState("");
  const { details, isLoading } = useSelector((state) => state.crud);

  // console.log(details)
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    //  dispatch(productUpdate(data))
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    if (image) {
      formData.append("image", image);
    } else {
      formData.append("image", data?.image);
    }
    formData.append("id", id);
    dispatch(productUpdate(formData));
  };
  useEffect(() => {
    dispatch(productDetails(id));
  }, [id, dispatch, navigate]);
  // useEffect(()=>{
  //  if(details !== null){
  //   setForm({
  //     title:details?.title,
  //     description:details?.description,

  //   })

  //  }
  // },[details])

  useEffect(() => {
    if (details !== null) {
      setValue("title", details?.title);
      setValue("description", details?.description);
    }
  }, [setValue, details]);
  return (
    <>
      <br />
      <br />
      <br />
      <br />

      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} sx={{ margin: "2rem auto" }}>
            <Paper elevation={3} sx={{ padding: 4 }}>
              <Typography variant="h5" gutterBottom>
                UPDATE
              </Typography>
              <form>
                <TextField
                  {...register("title", { required: "Title should not empty" })}
                  label="Title"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={errors.title}
                  helperText={errors.title && errors.title.message}
                />
                <TextField
                  {...register("description", {
                    required: "Provide product Description",
                  })}
                  label="Description"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  multiline
                  // rows={4}
                  error={errors.description}
                  helperText={errors.description && "Password is required"}
                />
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
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
                ) : (
                  <>
                    {details?.image === "" ? (
                      <img
                        height="70px"
                        src={image}
                        alt=""
                        className="upload-img"
                      />
                    ) : (
                      <img
                        height="60px"
                        src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${details?.image}`}
                        alt=""
                        className="upload-img"
                      />
                    )}
                  </>
                )}

                {isLoading ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ marginTop: 2 }}
                  >
                    Updating !...please wait
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    sx={{ marginTop: 2 }}
                  >
                    Update
                  </Button>
                )}
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default UpdateProduct;
