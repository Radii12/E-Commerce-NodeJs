const express = require("express");
const {
  getProducts,
  getSpecificProduct,
  updateSpecificProduct,
  createProduct,
  deleteSpecificProduct,
} = require("../Controller/productController.js");

const { check, validationResult } = require("express-validator");
const { createProductValidator, getProductValidator, updateProductValidator, deleteProductValidator } = require("../utils/validator/productValidator.js");
const { auther } = require("../Middleware/auth.js");
const { isAdmin } = require("../Middleware/isAdmin.js");
const routes = express.Router();

routes.get("/getProducts", getProducts);

routes.get("/getProduct/:id", getProductValidator,getSpecificProduct);

routes.post("/createProduct",createProductValidator,auther(),isAdmin(),createProduct);
routes.put("/updateProduct/:id",updateProductValidator,auther(),isAdmin(),updateSpecificProduct);
routes.put("/deleteProduct/:id",deleteProductValidator,auther(),isAdmin(),deleteSpecificProduct);
module.exports = routes;
