import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Grid, Container, Typography, Button } from "@mui/material";
import Textfield from "../components/FormsUI/Textfield";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
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
    <Container maxWidth="sm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h3">Sign Up</Typography>
            </Grid>

            <Grid item xs={12}>
              <Textfield name="email" label="Email" type="email" />
            </Grid>

            <Grid item xs={12}>
              <Textfield name="password" label="Password" type="password" />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Container>
  );
};

export default Register;
