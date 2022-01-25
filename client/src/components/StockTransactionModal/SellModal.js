import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button } from "components/Styled/style.js";

function SellModal(props) {
  const shareData = props.shareData;
  const userData = props.userData;
  const availableQuantity = props.availableQuantity;

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
    if (e.target.value > availableQuantity) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  const confirmOrder = async () => {
    if (quantity > availableQuantity) {
      return;
    }
    const data = {
      ticker: shareData.ticker,
      type: "sell",
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
        "https://wetrade-stock-project.herokuapp.com/api/stock/sellStock",
        order
      )
      .then((response) => {
        console.log(response.data);
        props.setOrderStatus(true);
        props.setTotalCost(response.data.total);
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
        show={props.sellModalShow}
        onHide={props.handleSellModalClose}
        onExit={onExit}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sell {shareData.ticker}</Modal.Title>
        </Modal.Header>

        {!props.orderStatus ? (
          <>
            <Modal.Body>
              <h5>How many shares would you like to sell?</h5>
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
                Estimated total return: $
                {Number.isNaN(estimatedCost)
                  ? quantity * shareData.currentPrice
                  : estimatedCost}
              </p>
              {showError ? (
                <p className="text-danger">
                  You do not have enough stock to fulfill this transaction.
                </p>
              ) : (
                <p></p>
              )}
              <br />
              <p>
                {shareData.ticker} shares owned: {availableQuantity}
              </p>
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
              <p>Total earning is : ${props.totalCost}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.handleSellModalClose}>
                Done
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}

export default SellModal;
