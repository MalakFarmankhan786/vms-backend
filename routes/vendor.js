const express = require("express");
const { body } = require("express-validator");
const vendorControllers = require("../controllers/vendor");
const validation = require("../validation/commonValidations");

const router = express.Router();

router.get("/vendors", vendorControllers.fetchedVendors);

router.get("/vendors/:vendor_id", vendorControllers.fetchedVendor);

router.post(
  "/vendors",
  [
    ...validation.requiredField("name", "Name"),
    ...validation.requiredLength("name", "Name"),

    ...validation.requiredField("contact_details", "Contact details"),
    ...validation.requiredLength("contact_details", "Contact details"),

    ...validation.requiredField("address", "Address"),
    ...validation.requiredLength("address", "Address"),

    ...validation.requiredField("vendor_code", "Vendor code"),

    ...validation.requiredField(
      "on_time_delivery_rate",
      "On time delivery rate"
    ),
    ...validation.isTypeFloat("on_time_delivery_rate", "On time delivery rate"),

    ...validation.requiredField("quality_rating_avg", "Quality rating avg"),
    ...validation.isTypeFloat("quality_rating_avg", "Quality rating avg"),

    ...validation.requiredField(
      "average_response_time",
      "Average response time"
    ),
    ...validation.isTypeFloat("average_response_time", "Average response time"),

    ...validation.requiredField("fulfillment_rate", "Fulfillment rate"),
    ...validation.isTypeFloat("fulfillment_rate", "Fulfillment rate"),
  ],
  vendorControllers.postVendor
);

router.put(
  "/vendors/:vendor_id",
  [
    ...validation.requiredField("name", "Name"),
    ...validation.requiredLength("name", "Name"),

    ...validation.requiredField("contact_details", "Contact details"),
    ...validation.requiredLength("contact_details", "Contact details"),

    ...validation.requiredField("address", "Address"),
    ...validation.requiredLength("address", "Address"),

    ...validation.requiredField("vendor_code", "Vendor code"),

    ...validation.requiredField(
      "on_time_delivery_rate",
      "On time delivery rate"
    ),
    ...validation.isTypeFloat("on_time_delivery_rate", "On time delivery rate"),

    ...validation.requiredField("quality_rating_avg", "Quality rating avg"),
    ...validation.isTypeFloat("quality_rating_avg", "Quality rating avg"),

    ...validation.requiredField(
      "average_response_time",
      "Average response time"
    ),
    ...validation.isTypeFloat("average_response_time", "Average response time"),

    ...validation.requiredField("fulfillment_rate", "Fulfillment rate"),
    ...validation.isTypeFloat("fulfillment_rate", "Fulfillment rate"),
  ],
  vendorControllers.updateVendor
);

router.delete("/vendors/:vendor_id", vendorControllers.deleteVendor);

module.exports = router;
