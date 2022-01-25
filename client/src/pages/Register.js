import React from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { Typography } from "@mui/material";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { BoxRound, Button } from "components/Styled/style.js";

const Wrapper = styled.div`
  margin-top: 40px;
`;

const Register = () => {
  let navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("*Enter your first name"),
    lastName: Yup.string().required("*Enter your last name"),
    email: Yup.string().email("*Invalid email").required("*Email is required"),
    password: Yup.string()
      .min(6, "*Password must be at least 6 characters long")
      .max(50, "*Description can't be more than 50 characters long")
      .required("*Password is required"),
  });

  const submitForm = (values) => {
    axios
      .post("https://wetrade-stock-project.herokuapp.com/auth", values)
      .then((values) => {
        console.log(values);
        navigate("/login");
      });
  };

  return (
    <Container>
      <BoxRound size="md">
        <Typography variant="h3">Sign up</Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              submitForm(values);
              resetForm();
              setSubmitting(false);
            }, 500);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              {/* {console.log(values)} */}
              <Wrapper>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                  <FloatingLabel label="First Name" className="mb-3">
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      className={
                        touched.firstName && errors.firstName ? "error" : null
                      }
                      style={{ width: "300px" }}
                    />
                  </FloatingLabel>
                  {touched.firstName && errors.firstName ? (
                    <div className="error-message">{errors.firstName}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                  <FloatingLabel label="Last Name" className="mb-3">
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      className={
                        touched.lastName && errors.lastName ? "error" : null
                      }
                      style={{ width: "300px" }}
                    />
                  </FloatingLabel>
                  {touched.lastName && errors.lastName ? (
                    <div className="error-message">{errors.lastName}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <FloatingLabel label="Email" className="mb-3">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className={touched.email && errors.email ? "error" : null}
                      style={{ width: "300px" }}
                    />
                  </FloatingLabel>
                  {touched.email && errors.email ? (
                    <div className="error-message">{errors.email}</div>
                  ) : null}
                </Form.Group>

                <FloatingLabel label="Password" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={
                      touched.password && errors.password ? "error" : null
                    }
                    style={{ width: "300px" }}
                  />
                </FloatingLabel>
                {touched.password && errors.password ? (
                  <div className="error-message">{errors.password}</div>
                ) : null}
              </Wrapper>

              <Wrapper>
                {/* <Button variant="secondary" type="submit" onClick={login}> */}
                <Button
                  variant="secondary"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ marginLeft: "22%" }}
                >
                  Submit
                </Button>
              </Wrapper>

              <Wrapper>
                <span style={{ marginLeft: "19%" }}>Have an account? </span>
                <Link to={"/login"} style={{ textDecoration: "underline" }}>
                  Log in
                </Link>
              </Wrapper>
            </Form>
          )}
        </Formik>
      </BoxRound>
    </Container>
  );
};

export default Register;
