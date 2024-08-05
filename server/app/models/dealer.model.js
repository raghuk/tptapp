
module.exports = (sequelize, DataTypes) => {
  const Dealer = sequelize.define('dealer', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(32),
      unique: true,
      allowNull: false,
      validate: {
        len: [2, 32],
      }
    },
    address: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    contact_no_1: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    contact_no_2: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING(64),
      allowNull: true
    }
  },
  {
    sequelize,
    initialAutoIncrement: 101,
    tableName: 'dealers',
    modelName: 'Dealer',
  });

  return Dealer;
};
