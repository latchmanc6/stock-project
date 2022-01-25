import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Typography } from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Button, CardRound } from "components/Styled/style.js";

const Container = styled.div`
  margin: 60px 20px 60px 20px;

  h4 {
    margin-left: 30%;
    color: rgb(64, 62, 61);
    font-weight: bold;
  }

  h5 {
    margin: 20px 0 10px 0;
    color: rgb(64, 62, 61);
  }

  h6 {
    color: rgb(64, 62, 61);
  }

  p,
  h6 {
    padding: 20px 0 0 30px;
  }

  p {
    font-size: 20px;
    font-weight: bold;
  }

  input {
    margin-left: 30px;
    width: 100%;
  }

  .big {
    margin-left: 30px;
    margin-bottom: 20px;
  }

  label {
    margin-left: 30px;
  }

  .passHeading {
    margin-bottom: 20px;
  }

  .passBtn {
    margin-top: 20px;
  }

  .inline {
    display: flex;
    justify-content: flex-start;
  }
`;

const Card = styled.div`
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(59 59 59 / 5%) 0px 5px 15px 0px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Profile = () => {
  let navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddress, setNewAddress] = useState({
    address: "",
    postalCode: "",
  });
  const [showForm, setShowForm] = useState({
    phone: false,
    address: false,
    password: false,
  });

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get("https://wetrade-stock-project.herokuapp.com/profile", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          console.log(response.data);
          setUserInfo(response.data);
        });
    }
  }, []);

  const editUserInfo = (option) => {
    if (option === "phone") {
      axios
        .put(
          "https://wetrade-stock-project.herokuapp.com/profile/phoneNumber",
          {
            phone: newPhone,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            console.log(response.data);
            setUserInfo({ ...userInfo, phone: newPhone });
            setShowForm({ ...showForm, phone: false });
          }
        });
    } else if (option === "address") {
      axios
        .put(
          "https://wetrade-stock-project.herokuapp.com/profile/address",
          {
            address: newAddress.address,
            postalCode: newAddress.postalCode,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            console.log(response.data);
            setUserInfo({
              ...userInfo,
              address: newAddress.address,
              postalCode: newAddress.postalCode,
            });
            setShowForm({ ...showForm, address: false });
          }
        });
    } else if (option === "password") {
      axios
        .put(
          "https://wetrade-stock-project.herokuapp.com/profile/password",
          {
            oldPassword,
            newPassword,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            console.log(response.data.message);
            setShowForm({ ...showForm, password: false });
          }
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Typography variant="h4">My Profile</Typography>
        </Col>

        {/* Phone & address */}
        <Col md={7}>
          <Typography variant="h5">Personal info</Typography>

          <CardRound>
            <Row>
              <Col>
                <Typography variant="h6">Phone Number</Typography>
              </Col>
            </Row>

            {/* Phone number */}
            <Row>
              {!showForm.phone ? (
                <>
                  <Col xs={12} md={10}>
                    {userInfo.phone ? (
                      <p>{userInfo.phone}</p>
                    ) : (
                      <p>Add your phone number</p>
                    )}
                  </Col>
                  <Col xs={6} md={2}>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setShowForm({ ...showForm, phone: true })}
                    >
                      Edit
                    </Button>
                  </Col>
                </>
              ) : (
                <>
                  <Col xs={12} md={10}>
                    <Form.Group className="mb-3" controlId="formBasicPhone">
                      <FloatingLabel label="Phone number" className="mb-3">
                        <Form.Control
                          name="phone"
                          type="text"
                          onChange={(e) => {
                            setNewPhone(e.target.value);
                          }}
                          placeholder="Phone number"
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Button
                      className="big"
                      variant="primary"
                      type="submit"
                      onClick={() => editUserInfo("phone")}
                    >
                      Submit
                    </Button>

                    <Button
                      className="big"
                      variant="cancel"
                      onClick={() => setShowForm({ ...showForm, phone: false })}
                    >
                      Cancel
                    </Button>
                  </Col>
                </>
              )}
            </Row>

            {/* address */}

            <Row>
              <Col>
                <Typography variant="h6">Address</Typography>
              </Col>
            </Row>

            <Row>
              {!showForm.address ? (
                <>
                  <Col xs={12} md={10}>
                    {userInfo.address ? (
                      <>
                        <div className="inline">
                          <p className="capitalize">{userInfo.address}</p>
                          <p className="uppercase">{userInfo.postalCode}</p>
                        </div>
                      </>
                    ) : (
                      <p>Add your Address</p>
                    )}
                  </Col>
                  <Col xs={6} md={2}>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        setShowForm({ ...showForm, address: true })
                      }
                    >
                      Edit
                    </Button>
                  </Col>
                </>
              ) : (
                <>
                  <Col xs={10} md={8}>
                    <Form.Group className="mb-3" controlId="formBasicAddress">
                      <FloatingLabel label="Address" className="mb-3">
                        <Form.Control
                          name="address"
                          type="text"
                          onChange={(e) => {
                            setNewAddress({
                              address: e.target.value,
                            });
                          }}
                          placeholder="Address"
                        />
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicPostalCode"
                    >
                      <FloatingLabel label="Postal code" className="mb-3">
                        <Form.Control
                          name="postalCode"
                          type="text"
                          onChange={(e) => {
                            setNewAddress({
                              postalCode: e.target.value,
                            });
                          }}
                          placeholder="Postal code"
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Button
                      className="big"
                      variant="primary"
                      type="submit"
                      onClick={() => editUserInfo("address")}
                    >
                      Submit
                    </Button>
                    <Button
                      className="big"
                      variant="cancel"
                      onClick={() =>
                        setShowForm({ ...showForm, address: false })
                      }
                    >
                      Cancel
                    </Button>
                  </Col>
                </>
              )}
            </Row>
          </CardRound>

          {/* Password */}

          <Typography variant="h5">Security</Typography>
          <CardRound>
            <Row>
              <Col xs={12} md={10}>
                <Typography variant="h6" className="passHeading">
                  Change password
                </Typography>
              </Col>
              {!showForm.password ? (
                <>
                  <Col xs={6} md={2}>
                    <Button
                      className="passBtn"
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        setShowForm({ ...showForm, password: true })
                      }
                    >
                      Edit
                    </Button>
                  </Col>
                </>
              ) : (
                <>
                  <Col xs={10} md={8}>
                    {/* Current Password */}

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicOldPassword"
                    >
                      <FloatingLabel label="Current password" className="mb-3 ">
                        <Form.Control
                          name="oldPassword"
                          type="password"
                          onChange={(e) => {
                            setOldPassword(e.target.value);
                          }}
                          placeholder="Current password"
                        />
                      </FloatingLabel>
                    </Form.Group>

                    {/* New Password */}

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                      <FloatingLabel label="New password" className="mb-3">
                        <Form.Control
                          name="newPassword"
                          type="password"
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                          }}
                          placeholder="New password"
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Button
                      className="big"
                      variant="primary"
                      type="submit"
                      onClick={() => editUserInfo("password")}
                    >
                      Submit
                    </Button>
                    <Button
                      className="big"
                      variant="cancel"
                      onClick={() =>
                        setShowForm({ ...showForm, password: false })
                      }
                    >
                      Cancel
                    </Button>
                  </Col>
                </>
              )}
            </Row>
            <Row></Row>
          </CardRound>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
