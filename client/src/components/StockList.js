import React, { useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

import Table from 'react-bootstrap/Table'

const StockList = () => {

  const tableHead = [
    "Ticker",
    "Today's price",
    "Total value",
    "All time return"
  ];

  return (
    <div>
      <h4>Your portfolio</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            {tableHead.map((head, key) => {
              return <th key={key}>{head}</th>
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default StockList
