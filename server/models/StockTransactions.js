module.exports = (sequelize, DataTypes) => {
  const StockTransactions = sequelize.define(
    "StockTransactions",
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

  StockTransactions.associate = (models) => {
    StockTransactions.belongsTo(models.Stocks, {
        foreignKey: 'StockId',
        as: 'Stocks',
        onDelete: 'CASCADE'
    });
  };

  return StockTransactions;
};
