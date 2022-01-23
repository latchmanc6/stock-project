import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

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
    await axios.post("http://localhost:3001/api/stock/sellStock", order);
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
        <Modal.Body>
          <div>How many shares would you like to sell?</div>
          <input
            defaultValue="1"
            onInput={(e) => {
              calculateTotal(e);
            }}
            type="number"
            min="1"
          ></input>
          <div>
            Estimated total return: $
            {Number.isNaN(estimatedCost)
              ? quantity * shareData.currentPrice
              : estimatedCost}
          </div>
          <br />
          {showError ? (
            <p className="text-danger">
              You do not have enough stock to fulfill this transaction.
            </p>
          ) : (
            <p></p>
          )}
          <br />
          <div>
            {shareData.ticker} shares owned: {availableQuantity}
          </div>
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

export default SellModal;
