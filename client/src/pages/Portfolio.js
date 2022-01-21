import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../helpers/AuthContext";

const Portfolio = () => {
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!authState.status) {
      // FIXME: 'you need to login' page with login link?
      navigate("/login");
    }
  }, []);

  return <div>portfolio</div>;
};

export default Portfolio;
