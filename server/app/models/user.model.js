
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 16],
        isAlphanumeric: true
      }
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: {
        len: [2, 32],
      }
    },
    lastname: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: {
        len: [2, 32],
      }
    },
    contact_no: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    sequelize,
    initialAutoIncrement: 101,
    tableName: 'users',
    modelName: 'User',
  });

  return User;
};
