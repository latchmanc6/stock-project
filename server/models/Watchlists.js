module.exports = (sequelize, DataTypes) => {
  const Watchlists = sequelize.define("Watchlists", {}, {
    tableName: "watchlists",
  });
  return Watchlists;
};
