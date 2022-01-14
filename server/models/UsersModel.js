module.exports = (sequelize, DataTypes) => {
  const UsersModel = sequelize.define(
    "UsersModel",
    {
      email: {
        type: DataTypes.STRING(360),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
      },
      cash: {
        type: DataTypes.DECIMAL(12, 2),
      },
      address: {
        type: DataTypes.STRING(300),
      },
      postalCode: {
        type: DataTypes.STRING(6),
      },
    },
    {
      tableName: "users",
    }
  );

  UsersModel.associate = (models) => {
    UsersModel.hasMany(models.StockTransactionModel, {
      onDelete: "cascade",
    });

    UsersModel.hasMany(models.FundTransactionModel, {
      onDelete: "cascade",
    });

    UsersModel.hasMany(models.WatchlistModel, {
      onDelete: "cascade",
    });
  };

  return UsersModel;
};
