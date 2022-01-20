module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      email: {
        type: DataTypes.STRING(360),
        allowNull: false,
        unique: true,
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
        allowNull: false,
        defaultValue: '0'
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

  Users.associate = (models) => {
    Users.hasMany(models.StockTransactions, {
      onDelete: "cascade",
    });

    Users.hasMany(models.FundTransactions, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Watchlists, {
      onDelete: "cascade",
    });
  };

  return Users;
};
