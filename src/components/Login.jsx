import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slice/authSlice";

import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.Auth);
  // console.log(isLoading)
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(login(data));
  };
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [token]);

  return (
    <>
      <div className="loginform">
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} sx={{ margin: "2rem auto" }}>
              <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Login
                </Typography>
                <form>
                  <TextField
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Invalid email format",
                      },
                    })}
                    label="Your Email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={errors.email}
                    helperText={errors.email && errors.email.message}
                  />
                  <TextField
                    {...register("password", { required: true })}
                    label="password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    multiline
                    error={errors.password}
                    helperText={errors.password && "Password is required"}
                  />
                  {isLoading ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      size="large"
                      sx={{ marginTop: 2 }}
                    >
                      Login !...please wait
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
                      Login
                    </Button>
                  )}
                </form>
                <Typography sx={{ marginTop: 2 }}>
                  Don't have any account ! Register now ...
                  <NavLink to="/register">Sign-up</NavLink>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Login;
