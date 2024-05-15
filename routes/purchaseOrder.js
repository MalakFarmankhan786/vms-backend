const express = require("express");
const purchaseOrderController = require("../controllers/purchaseOrder");

const validation = require("../validation/commonValidations");
const router = express.Router();

router.get("/purchase-orders", purchaseOrderController.getPurchaseOrders);

router.get("/purchase-orders/:po_id", purchaseOrderController.getPurchaseOrder);

router.post(
  "/purchase-orders",
  [
    ...validation.requiredField("po_number", "Purchase Order Number"),
    ...validation.requiredField("vendor_id", "Vendor"),
    ...validation.requiredField("order_date", "Order Date"),
    ...validation.requiredField("delivery_date", "Delivery Date"),
    ...validation.requiredField("items", "Items"),
    ...validation.requiredField("quantity", "Quantity"),
    ...validation.requiredField("issue_date", "Issue Date"),
  ],
  purchaseOrderController.createPurchaseOrder
);

router.put(
  "/purchase-orders/:po_id",
  purchaseOrderController.updatePurchaseOrder
);

router.delete(
  "/purchase-orders/:po_id",
  purchaseOrderController.deletePurchaseOrder
);

module.exports = router;
