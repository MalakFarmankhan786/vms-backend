const { where, Op } = require("sequelize");
const Vendor = require("../models/vendor");
const { validationResult } = require("express-validator");

exports.fetchedVendors = (req, res, next) => {
  Vendor.findAll()
    .then((vendor) => {
      res.json({
        status_code: 200,
        message: "Vendors fetched successfully!",
        vendors: vendor,
      });
    })
    .catch((error) => console.log(error));
};

exports.fetchedVendor = (req, res, next) => {
  const { vendor_id } = req.params;

  Vendor.findByPk(vendor_id)
    .then((vendor) => {
      if (!vendor) {
        const error = new Error(`Vendor of id:${vendor_id} not found!`);
        error.statusCode = 404;
        throw error;
      }
      res.json({
        status_code: 200,
        message: `Vendor ${vendor_id} fetched successfully!`,
        vendor: vendor,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.postVendor = (req, res, next) => {
  const { vendor_code } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().map((err) => {
      const error = new Error(err.msg.message);
      error.statusCode = err.msg.status_code;
      throw error;
    });
  }
  // if (!errors.isEmpty()) {
  //   const firstError = errors.array()[0];
  //   const error = new Error(firstError.msg.message);
  //   error.statusCode = firstError.msg.status_code;
  //   throw error;
  // }

  Vendor.findOne({ where: { vendor_code: vendor_code } })
    .then((vendor) => {
      if (vendor) {
        const error = new Error("Vendor code already exists!");
        error.statusCode = 409;
        throw error;
      }
      const new_vendor = new Vendor(req.body);
      return new_vendor.save();
    })
    .then((result) => {
      res.json({
        status_code: 201,
        message: "Vendor posted successfully!",
        vendor: result,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
        error.message = "Network error";
      }
      next(error);
    });
};

exports.updateVendor = (req, res, next) => {
  const { vendor_id } = req.params;

  const {
    name,
    contact_details,
    address,
    vendor_code,
    on_time_delivery_rate,
    quality_rating_avg,
    average_response_time,
    fulfillment_rate,
  } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().map((err) => {
      const error = new Error(err.msg.message);
      error.statusCode = err.msg.status_code;
      throw error;
    });
  }

  let loadedVendor;
  Vendor.findByPk(vendor_id)
    .then((vendor) => {
      if (!vendor) {
        const error = new Error(`Vendor of id:${vendor_id} not found!`);
        error.statusCode = 404;
        throw error;
      }
      loadedVendor = vendor;

      return Vendor.findOne({
        where: { vendor_code: vendor_code, id: { [Op.ne]: vendor_id } },
      });
    })
    .then((isVendor) => {
      if (isVendor) {
        const error = new Error(`Vendor code is already exists!`);
        error.statusCode = 409;
        throw error;
      }
      // loadedVendor.name = name;
      // loadedVendor.contact_details = contact_details;
      // loadedVendor.address = address;
      // loadedVendor.vendor_code = vendor_code;
      // loadedVendor.on_time_delivery_rate = on_time_delivery_rate;
      // loadedVendor.quality_rating_avg = quality_rating_avg;
      // loadedVendor.average_response_time = average_response_time;
      // loadedVendor.fulfillment_rate = fulfillment_rate;
      // return loadedVendor.save();
      loadedVendor.set(req.body);
      return loadedVendor.save();
    })
    .then((result) => {
      res
        .status(200)
        .json({ message: "Vendor updated successfully!", vendor: result });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
        error.message = "Network error";
      }
      next(error);
    });
};

exports.deleteVendor = (req, res, next) => {
  const { vendor_id } = req.params;

  Vendor.findByPk(vendor_id)
    .then((vendor) => {
      if (!vendor) {
        const error = new Error(`Vendor of id:${vendor_id} not found!`);
        error.statusCode = 404;
        throw error;
      }
      return vendor.destroy();
    })
    .then((result) => {
      res
        .status(200)
        .json({ message: "Vendor deleted successfully!", vendor: result });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
        error.message = "Network error";
      }
      next(error);
    });
};
