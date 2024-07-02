import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: "white",
}));

export default function Footer() {
  const [sub, setSub] = useState("");
  const subscribe = (e) => {
    e.preventDefault();
    if (sub !== "") {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Thank You",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      alert("email is required !");
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 1, md: 0, sm: 0 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <Item>
              <h3>
                <u>
                  <i>Company</i>
                </u>
              </h3>
              <p>
                Your Academy Kolkata <br />
                West Bengal <br />
                India 700001 <br />
                <strong>Phone:</strong> +1 5589 55488 55 <br />
                <strong>Email:</strong> info@example.com
              </p>
            </Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Item>
              <h4>
                <u>
                  <i>Useful Links</i>
                </u>
              </h4>
              <ul>
                <li>
                  <Link to="">Home</Link>
                </li>
                <li>
                  <Link to="">About us</Link>
                </li>
                <li>
                  <Link to="">Services</Link>
                </li>
                <li>
                  <Link to="">Terms and Services</Link>
                </li>
                <li>
                  <Link to="">Privacy policy</Link>
                </li>
              </ul>
            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Item>
              <h4>
                <u>
                  <i>Our Services</i>
                </u>
              </h4>
              <ul>
                <li>
                  <Link to="">Web Design</Link>
                </li>
                <li>
                  <Link to="">Web Development</Link>
                </li>
                <li>
                  <Link to="">Product Management</Link>
                </li>
                <li>
                  <Link to="">Marketing</Link>
                </li>
                <li>
                  <Link to="">Graphic Design</Link>
                </li>
              </ul>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <h4>
                <u>
                  <i>Join Our Newsletter</i>
                </u>
              </h4>
              <p>
                Tamen quem nulla quae legam multos aute sint culpa legam noste
                noster magna Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Dignissimos, rerum!
              </p>
              <form onSubmit={subscribe}>
                <input type="email" onChange={(e) => setSub(e.target.value)} />
                <input type="submit" value="Subscribe" />
              </form>
            </Item>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Item>© Copyright Company. All Rights Reserved</Item>
          <Item></Item>
        </Grid>
      </Box>
    </>
  );
}
