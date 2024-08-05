
module.exports = (sequelize, DataTypes) => {
  const Owner = sequelize.define('owner', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
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
    department: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique: true
    },
    location: {
      type: DataTypes.ENUM,
      values: ['Shantivan', 'Pandav Bhawan', 'Gyan Sarovar'],
      allowNull: false
    },
    contact_no_1: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    contact_no_2: {
      type: DataTypes.STRING(16),
      allowNull: false
    }
  },
  {
    sequelize,
    initialAutoIncrement: 101,
    tableName: 'owners',
    modelName: 'Owner',
  });

  return Owner;
};
