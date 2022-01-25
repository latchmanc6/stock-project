import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import Table from "react-bootstrap/Table";

const ReturnWrapper = styled.div`
  display: flex;
`;

const StyledTable = styled.table`
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(59 59 59 / 5%) 0px 5px 15px 0px;
  width: 100%;

  border-collapse: collapse;

  th,
  td {
    padding: 15px;
  }

  tr {
    border-bottom: 1px solid rgb(230, 228, 227);
  }
`;

function FundingHistory() {
  const [history, setHistory] = useState([]);
  const tableHead = ["Type", "Amount", "Date"];
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get(
          "https://wetrade-stock-project.herokuapp.com/funds/getUserTransactionHistory",
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        )
        .then((response) => {
          console.log(response.data);
          setHistory(response.data);
        });
    }
  }, []);

  return (
    <div>
      <StyledTable>
        <thead>
          <tr>
            {tableHead.map((head, key) => {
              return <th key={key}>{head}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {history.map((value, key) => {
            return (
              <tr
                key={key}
                className="point"
              >
                <td>
                  <h5>{value.type}</h5>
                </td>
                <td>
                  <h5>${value.total}</h5>
                  <span className="text-muted">USD</span>
                </td>
                <td>
                  <h5>{moment(value.createdAt).format("DD/MM/YYYY")}</h5>
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </div>
  );
}

export default FundingHistory;
