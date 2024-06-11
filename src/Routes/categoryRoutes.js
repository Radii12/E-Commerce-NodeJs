const express = require("express");
const {
  getCategories,
  getSpecificCategory,
  updateSpecificCategory,
  createCategory,
  deleteSpecificCategory,
} = require("./../Controller/categoryController.js");
const {createCategoryValidation,updateCategoryValidation,deleteCategoryValidation} = require("../utils/validator/getCategoryValidation.js");
const { isAdmin } = require("../Middleware/isAdmin.js");
const { auther } = require("../Middleware/auth.js");
// const {  check,validationResult} = require('express-validator')
const rout = express.Router();

rout.get("/getCategories", getCategories);

rout.get("/getCategory/:id",getSpecificCategory)

rout.post("/createCategory",auther(),isAdmin(),createCategory);
rout.put("/updateCategory/:id",updateCategoryValidation,auther(),isAdmin(),updateSpecificCategory);
rout.put("/deleteCategory/:id",deleteCategoryValidation,auther(),isAdmin(),deleteSpecificCategory);
module.exports = rout;
