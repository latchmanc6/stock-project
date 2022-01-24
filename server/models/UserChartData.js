module.exports = (sequelize, DataTypes) => {
  const UserChartData = sequelize.define(
    "UserChartData",
    {
      totalAccountValue: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "user_chart_data",
    }
  );
  return UserChartData;
};
