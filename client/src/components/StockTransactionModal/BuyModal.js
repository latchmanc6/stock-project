import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button } from "components/Styled/style.js";

function BuyModal(props) {
  const shareData = props.shareData;
  const userData = props.userData;

  const [quantity, setQuantity] = useState();
  const [estimatedCost, setEstimatedCost] = useState(
    1 * shareData.currentPrice
  );
  const [showError, setShowError] = useState();

  useEffect(() => {
    setQuantity(1);
    setEstimatedCost(quantity * shareData.currentPrice);
  }, []);

  const calculateTotal = (e) => {
    setQuantity(e.target.value);
    const cost = e.target.value * shareData.currentPrice;
    setEstimatedCost((Math.round(cost * 100) / 100).toFixed(2));
    if (e.target.value * shareData.currentPrice > userData.cash) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  const confirmOrder = async () => {
    if (quantity * shareData.currentPrice > userData.cash) {
      return;
    }
    const data = {
      ticker: shareData.ticker,
      type: "buy",
      quantity: quantity,
      sharePrice: shareData.currentPrice,
      total: (
        Math.round(quantity * shareData.currentPrice * 100) / 100
      ).toFixed(2),
      StockId: shareData.id,
      UserId: userData.id,
    };
    const order = { data, userData };
    await axios
      .post(
        "https://wetrade-stock-project.herokuapp.com/api/stock/buyStock",
        order
      )
      .then((response) => {
        console.log(response.data)
        props.setOrderStatus(true);
        props.setTotalCost(response.data.total)
      });
  };

  const onExit = () => {
    setQuantity(1);
    setEstimatedCost(quantity * shareData.currentPrice);
  };

  return (
    <div>
      <Modal
        centered
        show={props.buyModalShow}
        onHide={props.handleBuyModalClose}
        onExit={onExit}
      >
        <Modal.Header closeButton>
          <Modal.Title>Buy {shareData.ticker}</Modal.Title>
        </Modal.Header>
        
        {!props.orderStatus ? (
          <>
            <Modal.Body>
              <h5>How many shares would you like to buy?</h5>
              <Form.Control
                defaultValue="1"
                type="number"
                onInput={(e) => {
                  calculateTotal(e);
                }}
                type="number"
                min="1"
              />
              {/* <input
                defaultValue="1"
                onInput={(e) => {
                  calculateTotal(e);
                }}
                type="number"
                min="1"
              ></input> */}
              <p className="modalCost">
                Estimated cost: $
                {Number.isNaN(estimatedCost)
                  ? quantity * shareData.currentPrice
                  : estimatedCost}
              </p>
              {showError ? (
                <p className="text-danger">
                  You do not have enough funds to fulfill this transaction.
                </p>
              ) : (
                <p></p>
              )}
              <br />
              <p>Your cash: ${userData.cash}</p>
              <p>Current Share Price: ${shareData.currentPrice}</p>
              <br />
              <Modal.Footer>
                <Button variant="secondary" onClick={confirmOrder}>
                  Confirm Order
                </Button>
              </Modal.Footer>
            </Modal.Body>
          </>
        ) : (
          <>
            <Modal.Body>
              <h4>Your order confirmed!</h4>
              <p>Total cost is : ${props.totalCost}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.handleBuyModalClose}>
                Done
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}

export default BuyModal;
