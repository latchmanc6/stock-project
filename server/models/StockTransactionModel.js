module.exports = (sequelize, DataTypes) => {
  const StockTransactionModel = sequelize.define(
    "StockTransactionModel",
    {
      ticker: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("buy", "sell"),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      sharePrice: {
        type: DataTypes.DECIMAL(12, 2),
      },
      total: {
        type: DataTypes.DECIMAL(12, 2),
      },
    },
    {
      tableName: "stock_transactions",
    }
  );
  return StockTransactionModel;
};
