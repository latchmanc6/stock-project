import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserAssetChart from "../components/UserAssetChart";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Home() {

  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } 
  }, []);


  return (
    <div>
      <UserAssetChart></UserAssetChart>
    </div>
  );
}

export default Home;
