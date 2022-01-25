import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Typography } from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { BoxRound, Button } from "components/Styled/style.js";

const Container = styled.div`
  margin-top: 60px;

  .text-left {
    text-algin: left;
  }
`;

const Profile = () => {
  let navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  // const [showPhoneForm, setShowPhoneForm] = useState(false);
  // const [showAddressForm, setShowAddressForm] = useState(false);
  // const [showPasswordForm, setShowPasswordForm] = useState(false);
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
        .get("http://localhost:3001/profile", {
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
          "http://localhost:3001/profile/phoneNumber",
          {
            phone: userInfo.phone,
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
            setUserInfo({ ...userInfo, phone: userInfo.phone });
            setShowForm({ ...showForm, phone: false });
          }
        });
    } else if (option === "address") {
      axios
        .put(
          "http://localhost:3001/profile/address",
          {
            address: userInfo.address,
            postalCode: userInfo.postalCode,
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
              address: userInfo.address,
              postalCode: userInfo.postalCode,
            });
            setShowForm({ ...showForm, address: false });
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

          <BoxRound>
            <Row>
              <Col>
                <Typography variant="h7">Phone Number</Typography>
              </Col>
            </Row>

            <Row>
              {!showForm.phone ? (
                <>
                  <Col>
                    {userInfo.phone ? (
                      <p>{userInfo.phone}</p>
                    ) : (
                      <p>Add your phone number</p>
                    )}
                  </Col>
                  <Col>
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
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicPhone">
                      <FloatingLabel label="Phone number" className="mb-3">
                        <Form.Control
                          name="phone"
                          type="text"
                          onChange={(e) => {
                            setUserInfo({ ...userInfo, phone: e.target.value });
                          }}
                          placeholder="Phone number"
                          style={{ width: "300px" }}
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={() => editUserInfo("phone")}
                    >
                      Submit
                    </Button>
                  </Col>
                </>
              )}
            </Row>

            {/* address */}

            <Row>
              <Col>
                <Typography variant="h7">Address</Typography>
              </Col>
            </Row>

            <Row>
              {!showForm.address ? (
                <>
                  <Col>
                    {userInfo.address ? (
                      <p>{userInfo.address}</p>
                    ) : (
                      <p>Add your Address</p>
                    )}
                  </Col>
                  <Col>
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
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicAddress">
                      <FloatingLabel label="Address" className="mb-3">
                        <Form.Control
                          name="address"
                          type="text"
                          onChange={(e) => {
                            setUserInfo({
                              ...userInfo,
                              address: e.target.value,
                            });
                          }}
                          placeholder="Address"
                          style={{ width: "300px" }}
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
                            setUserInfo({
                              ...userInfo,
                              postalCode: e.target.value,
                            });
                          }}
                          placeholder="Postal code"
                          style={{ width: "300px" }}
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={() => editUserInfo("address")}
                    >
                      Submit
                    </Button>
                  </Col>
                </>
              )}
            </Row>
          </BoxRound>

          {/* Password */}

          <Typography variant="h5">Security</Typography>
          <BoxRound>
            <Row>
              <Col>
                <Typography variant="h7">Change password</Typography>
              </Col>
              <Col>
                <Button variant="primary" size="sm">
                  Change password
                </Button>
              </Col>
            </Row>
          </BoxRound>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
