
module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('vehicle', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    registration_no: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(128)
    },
    holder: {
      type: DataTypes.ENUM,
      values: ['PBKIVV', 'WRST', 'RERF', 'BKEDU'],
      allowNull: false,
      defaultValue: 'PBKIVV'
    },
    type: {
      type: DataTypes.ENUM,
      values: ['Scooter', 'MCycle', 'Car', 'Jeep', 'Bus', 'Truck', 'Others'],
      allowNull: false
    },
    chassis_no: {
      type: DataTypes.STRING(24),
      allowNull: false
    },
    engine_no: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    rto: {
      type: DataTypes.STRING(24),
      allowNull: false
    },
    purchased_on: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    rc_valid_till: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hsr_no_plate: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    rc_file_path: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['NEW', 'ACTIVE', 'SOLD', 'SCRAPPED'],
      allowNull: false,
      defaultValue: 'NEW'
    }
  },
  {
    sequelize,
    initialAutoIncrement: 101,
    tableName: 'vehicles',
    modelName: 'Vehicle',
  });

  return Vehicle;
};
