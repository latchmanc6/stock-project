module.exports = (sequelize, DataTypes) => {
  const StockModel = sequelize.define(
    "StockModel",
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

  StockModel.associate = (models) => {
    StockModel.hasMany(models.StockTransactionModel, {
      onDelete: "cascade",
    });

    StockModel.hasMany(models.WatchlistModel, {
      onDelete: "cascade",
    });
  };

  return StockModel;
};
