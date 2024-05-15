const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Vendor = require('./vendor'); // Import the Vendor model if not already imported

const PurchaseOrder = sequelize.define('PurchaseOrder', {
  po_number: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  vendor_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Vendor,
      key: 'id'
    }
  },
  order_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  delivery_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  items: {
    type: DataTypes.JSON,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
  quality_rating: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  issue_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  acknowledgment_date: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  // Other model options
});

module.exports = PurchaseOrder;
