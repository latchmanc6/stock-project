module.exports = (sequelize, DataTypes) => {
  const WatchlistModel = sequelize.define("WatchlistModel", {}, {
    tableName: "watchlist",
  });
  return WatchlistModel;
};
