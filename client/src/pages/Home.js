import React, { useEffect } from "react";
import UserAssetChart from "../components/UserAssetChart";
import { useNavigate } from "react-router-dom";
import FundCard from "components/Portfolio/FundCard";

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
      <div className="text-center">
        <FundCard />
      </div>
    </div>
  );
}

export default Home;
