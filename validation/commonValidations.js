const { body } = require("express-validator");

exports.requiredField = (field, fieldName) => [
  body(field)
    .notEmpty()
    .withMessage({
      message: `${fieldName} field is required!`,
      status_code: 422,
    }),
];

exports.requiredLength = (field, fieldName) => [
  body(field)
    .trim()
    .isLength({ min: 5 })
    .withMessage({
      message: `${fieldName} length must be 5 or long!`,
      status_code: 422,
    }),
];

exports.isTypeFloat = (field, fieldName) => [
  body(field)
    .trim()
    .isFloat()
    .withMessage({
      message: `${fieldName} must be in number!`,
      status_code: 422,
    }),
];
