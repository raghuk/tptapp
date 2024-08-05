
module.exports = (sequelize, DataTypes) => {
  const Permit = sequelize.define('permits', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'vehicles',
        key: 'id',
        deferrable: DataTypes.INITIALLY_IMMEDIATE
      }
    },
    permit_no: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    permit_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER(4).UNSIGNED,
      allowNull: false
    },
    file_path: {
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
    tableName: 'permits',
    modelName: 'Permit',
  });

  return Permit;
};
