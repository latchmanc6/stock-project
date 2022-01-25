import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Typography } from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
        setUserInfo(response.data)
      });
    }
  }, []);

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
              <Col>
                <Button variant="primary" size="sm">
                  Edit
                </Button>
              </Col>
            </Row>

            <Row>
              <p>{userInfo.phone ? (
                userInfo.phone
              ): (
                "Add you phone number"
              )}
              </p>
            </Row>

            <Row>
              <Col>
                <Typography variant="h7">Address</Typography>
              </Col>
              <Col>
                <Button variant="primary" size="sm">
                  Edit
                </Button>
              </Col>
            </Row>

            <Row>
              <p>Address</p>
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
