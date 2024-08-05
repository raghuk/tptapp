
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(16),
      unique: true
    }
  },
  {
    sequelize,
    tableName: 'roles',
    modelName: 'Role',
  });

  return Role;
};
