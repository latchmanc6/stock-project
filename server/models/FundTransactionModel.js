module.exports = (sequelize, DataTypes) => {
  const FundTransactionModel = sequelize.define(
    "FundTransactionModel",
    {
      type: {
        type: DataTypes.ENUM("deposit", "withdraw"),
        allowNull: false,
      },
      total: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stripeToken: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "fund_transactions",
    }
  );
  return FundTransactionModel;
};
