// importing required packages and modules
const Joi = require(`joi`);

// importing required custom data validators
const { objectIdValidation, validatePhoneNo, base64Validation, jsonObjValidation } = require(`../helpers/joi.helpers`);



// defining valdiation schema to add a user
const newUserSchema = Joi.object({

  firstName: Joi.string().required(),
  lastName: Joi.string(),
  // gender: Joi.string().required(),
  // img: Joi.string().custom(base64Validation, `Base64 Validation`).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().custom(validatePhoneNo, `Phone Validation`).required(),
  password: Joi.string().min(3).required(),
  role: Joi.string().required(),
  // role: Joi.array().items(
  //   Joi.string().custom(objectIdValidation, `SystemRole ID Validation`).required()
  // ).required(),
  address: Joi.string().min(1).required(),

});

// defining valdiation schema to add a user
const loginUserSchema = Joi.object({

  email: Joi.string().email().required(),
  password: Joi.string().min(3).required()

});

// defining valdiation schema for specific User
const specificUserSchema = Joi.object({

  userId: Joi.string().custom(objectIdValidation, `User ID Validation`).required(),

});

// defining valdiation schema to update a user
const updateUserSchema = Joi.object({

  firstName: Joi.string(),
  lastName: Joi.string(),
  // gender: Joi.string(),
  // img: Joi.string().custom(base64Validation, `Base64 Validation`),
  email: Joi.string().email(),
  phone: Joi.string().custom(validatePhoneNo, `Phone Validation`),
  password: Joi.string().min(3),
  systemRoles: Joi.array().items(
    Joi.string().custom(objectIdValidation, `SystemRole ID Validation`)
  ),
  address: Joi.string().min(1),

});

// defining valdiation schema for paginated franchise names
const userListSchema = Joi.object({

  search: Joi.string().allow(``).required(),
  offset: Joi.number().required(),
  page: Joi.number().required()

});

// defining valdiation schema for paginated, searched, sorted users
const allUsersSchema = Joi.object({

  search: Joi.string().custom(jsonObjValidation, `Search validation`),
  sort: Joi.string(),
  offset: Joi.number().min(1),
  page: Joi.number().min(1)

});



// exporting schemas as modules
module.exports = {

  newUserSchema,
  specificUserSchema,
  updateUserSchema,
  userListSchema,
  allUsersSchema,
  loginUserSchema

};