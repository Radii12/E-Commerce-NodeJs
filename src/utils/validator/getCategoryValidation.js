const { check } = require("express-validator");
const validationMiddleware=require("../../Middleware/validationMiddleware")
module.exports.getCategoryValidation = [
    check('id').isMongoId().withMessage("invalid category id"),
    validationMiddleware,
];
exports. createCategoryValidation=[
    check("name").notEmpty().withMessage("Cagtegory Name is  required")
    .isLength({min:3}).withMessage("The name is too short")
    .isLength({max:32}).withMessage('The name is too long '),
    validationMiddleware,
];

exports. updateCategoryValidation=[
    check('id').isMongoId().withMessage("invalid category id"),
    validationMiddleware,
];
exports.deleteCategoryValidation=[
    check('id').isMongoId().withMessage("invalid category id"),
    validationMiddleware,
];