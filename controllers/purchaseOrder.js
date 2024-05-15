const { where } = require("sequelize");
const PurchaseOrder = require("../models/purchaseOrder");
const { validationResult } = require("express-validator");

exports.getPurchaseOrders = (req, res, next) => {
  PurchaseOrder.findAll()
    .then((purchaseOrders) => {
      res.status(200).json({
        message: "Purchase orders fetched successfully!",
        purchaseOrders: purchaseOrders,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getPurchaseOrder = (req, res, next) => {
  const { po_id } = req.params;
  PurchaseOrder.findOne({ where: { po_number: po_id } })
    .then((purchaseOrder) => {
      if (!purchaseOrder) {
        const error = new Error(`Purchase order of id:${po_id} not found!`);
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: `Purchase order of id:${po_id} fetched successfully!`,
        purchaseOrder: purchaseOrder,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
        error.message = "Server side error!";
      }
      next(error);
    });
};

exports.createPurchaseOrder = (req, res, next) => {
  const { po_number } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const purchaseOrderError = errors.array()[0];
    const error = new Error(purchaseOrderError?.msg.message);
    error.statusCode = purchaseOrderError?.msg.status_code;
    throw error;
  }

  console.log("Po", req.body);

  PurchaseOrder.findOne({ where: { po_number: po_number } })
    .then((purchaseOrder) => {
      if (purchaseOrder) {
        const error = new Error(
          `Purchase order of id:${po_number} is already exists!`
        );
        error.statusCode = 409;
        throw error;
      }
      return PurchaseOrder.create(req.body);
    })
    .then((newPurchaseOrder) => {
      res.status(201).json({
        message: `Purchase order created successfully!`,
        purchaseOrder: newPurchaseOrder,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
        error.message = "Server side error!";
      }
      next(error);
    });
};

exports.updatePurchaseOrder = (req, res, next) => {
  const { po_id } = req.params;
  PurchaseOrder.findOne({ where: { po_number: po_id } })
    .then((purchaseOrder) => {
      if (!purchaseOrder) {
        const error = new Error(`Purchase order of id:${po_id} not found!`);
        error.statusCode = 404;
        throw error;
      }

      // update here purchaseOrder

      res.status(200).json({
        message: `Purchase order of id:${po_id} updated successfully!`,
        purchaseOrder: {},
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
        error.message = "Server side error!";
      }
      next(error);
    });
};

exports.deletePurchaseOrder = (req, res, next) => {
  const { po_id } = req.params;
  PurchaseOrder.findOne({ where: { po_number: po_id } })
    .then((purchaseOrder) => {
      if (!purchaseOrder) {
        const error = new Error(`Purchase order of id:${po_id} not found!`);
        error.statusCode = 404;
        throw error;
      }

      // delete here purchaseOrder

      res.status(200).json({
        message: `Purchase order of id:${po_id} deleted successfully!`,
        purchaseOrder: {},
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
        error.message = "Server side error!";
      }
      next(error);
    });
};
