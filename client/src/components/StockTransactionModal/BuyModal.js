import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

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
    await axios.post("https://wetrade-stock-project.herokuapp.com/api/stock/buyStock", order);
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
        <Modal.Body>
          <div>How many shares would you like to buy?</div>
          <input
            defaultValue="1"
            onInput={(e) => {
              calculateTotal(e);
            }}
            type="number"
            min="1"
          ></input>
          <div>
            Estimated cost: $
            {Number.isNaN(estimatedCost)
              ? quantity * shareData.currentPrice
              : estimatedCost}
          </div>
          <br />
          {showError ? (
            <p className="text-danger">
              You do not have enough funds to fulfill this transaction.
            </p>
          ) : (
            <p></p>
          )}
          <br />
          <div>Your cash: ${userData.cash}</div>
          <div>Current Share Price: ${shareData.currentPrice}</div>
          <br />
          <Modal.Footer>
            <button onClick={confirmOrder} className="btn btn-primary">
              Confirm Order
            </button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BuyModal;
