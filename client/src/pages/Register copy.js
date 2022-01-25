import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import { Grid, Typography, Box } from "@mui/material";
import { spacing } from "@mui/system";
import Textfield from "components/FormsUI/Textfield";
import { useNavigate } from "react-router-dom";
import { BoxRound, Button } from "components/Styled/style.js";

const Register = () => {
  let navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Enter your first name"),
    lastName: Yup.string().required("Enter your last name"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .max(50, "Description can't be more than 50 characters long")
      .required("Password is required"),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((data) => {
      console.log(data);
      navigate("/login");
    });
  };

  return (
    <Container>
      <BoxRound size="md">
        <Grid item xs={12} xs={{ m: 20 }}>
          <Typography variant="h3">Sign Up</Typography>
        </Grid>

        <Grid container direction="column" alignItems="center" justify="center">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <Grid item xs={9} xs={{ m: 10 }}>
                <Textfield name="firstName" label="First Name" type="text" />
              </Grid>

              <Grid item xs={9}>
                <Textfield name="lastName" label="Last Name" type="text" />
              </Grid>

              <Grid item xs={9}>
                <Textfield name="email" label="Email" type="email" />
              </Grid>

              <Grid item xs={9} sx={{ width: 300 }}>
                <Textfield name="password" label="Password" type="password" />
              </Grid>

              <Grid item xs={9}>
                <Button variant="secondary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </BoxRound>
    </Container>

    // <Container maxWidth="sm">
    //   <Formik
    //     initialValues={initialValues}
    //     validationSchema={validationSchema}
    //     onSubmit={onSubmit}
    //   >
    //     <Form>
    //       <Grid container spacing={3}>
    //         <Grid item xs={12}>
    //           <Typography variant="h3">Sign Up</Typography>
    //         </Grid>

    //         <Grid item xs={12}>
    //           <Textfield name="firstName" label="First Name" type="text" />
    //         </Grid>

    //         <Grid item xs={12}>
    //           <Textfield name="lastName" label="Last Name" type="text" />
    //         </Grid>

    //         <Grid item xs={12}>
    //           <Textfield name="email" label="Email" type="email" />
    //         </Grid>

    //         <Grid item xs={12}>
    //           <Textfield name="password" label="Password" type="password" />
    //         </Grid>

    //         <Grid item xs={12}>
    //           <Button variant="contained" type="submit">
    //             Submit
    //           </Button>
    //         </Grid>
    //       </Grid>
    //     </Form>
    //   </Formik>
    // </Container>
  );
};

export default Register;
