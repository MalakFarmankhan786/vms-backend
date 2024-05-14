const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../sequelize');

const Vendor = sequelize.define('Vendor', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_details: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  vendor_code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  on_time_delivery_rate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quality_rating_avg: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  average_response_time: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fulfillment_rate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  // Other model options
});

module.exports = Vendor;
