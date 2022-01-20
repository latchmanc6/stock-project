module.exports = (sequelize, DataTypes) => {
  const FundTransactions = sequelize.define(
    "FundTransactions",
    {
      type: {
        type: DataTypes.ENUM("deposit", "withdraw"),
        allowNull: false,
      },
      total: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      chargeId: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "fund_transactions",
    }
  );
  return FundTransactions;
};
