const Product = require("../Model/ProductSchema.js");
const handelError = require("../utils/errorHandler");
const ApiError = require("..//utils/apiError.js");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

//get getproduct ///////////////////
exports.getProducts = handelError(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  console.log(req.query.sort);

  const products = await Product.find().skip(skip).limit(limit);

  res.status(200).json({ results: products.length, page, data: products });
});
//Create Category ///////////////////
exports.createProduct = asyncHandler(async (req, res) => {
  // slugify(req.body.price);

      const add = await Product.create(req.body);
    res.json({
      add,
    });
})
//getSpecificCategory by id
exports.getSpecificProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ApiError(`"There is no category with this id" ${id}`), 404);
    //res.status(404).json({message:`There is no category with this id ${id}`})
  } else {
    res.status(200).json({ data: product });
  }
});

//Update category
exports.updateSpecificProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.productName);

  const updatedProduct = await Product.findOneAndUpdate({_id:id}, req.body, {new: true,});

  if (!updatedProduct) {
    return next(new ApiError(`"There is no category with this id" ${id}`), 404);
  } else {
    res.status(200).json({ data: updatedProduct });
  }
});
exports.deleteSpecificProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deleteProduct = await Product.findByIdAndDelete(id);
  if (!deleteProduct) {
    return next(new ApiError(`"There is no category with this id" ${id}`), 404);
  } else {
    res.status(204).send();
  }
});
