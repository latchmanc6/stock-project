module.exports = (sequelize, DataTypes) => {
  const Stocks = sequelize.define(
    "Stocks",
    {
      ticker: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currentPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      high52Week: {
        type: DataTypes.DECIMAL(10, 2),
      },
      high52WeekDate: {
        type: DataTypes.DATE,
      },
      low52Week: {
        type: DataTypes.DECIMAL(10, 2),
      },
      low52WeekDate: {
        type: DataTypes.DATE,
      },
      peRatio: {
        type: DataTypes.DECIMAL(10, 2),
      },
      dividendPerShareAnnual: {
        type: DataTypes.DECIMAL(10, 2),
      },
      exchange: {
        type: DataTypes.STRING,
      },
      sector: {
        type: DataTypes.STRING,
      },
      logo: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "stocks",
    }
  );

  Stocks.associate = (models) => {
    Stocks.hasMany(models.StockTransactions, {
      onDelete: "cascade",
    });

    Stocks.hasMany(models.Watchlists, {
      onDelete: "cascade",
    });
  };

  return Stocks;
};
