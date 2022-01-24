module.exports = (sequelize, DataTypes) => {
  const Watchlists = sequelize.define(
    "Watchlists",
    {},
    {
      tableName: "watchlists",
    }
  );

  Watchlists.associate = (models) => {
    Watchlists.belongsTo(models.Stocks, {
      foreignKey: "StockId",
      as: "Stocks",
      onDelete: "CASCADE",
    });
  };

  return Watchlists;
};
