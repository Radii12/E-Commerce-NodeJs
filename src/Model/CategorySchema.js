const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "category name is required"],
      unique: [true, "The name of category must by unique"],
      minlength:[3,"Too short name"],
      maxlength:[32,"Too long name"],
      term:true
    },
    slug: {
      type: String,
      lowercase: true,
    },
    createdBy: {
      type: String,
    },
    image:String,
  
    },
  { timestamps: true }
);
const categoryModule = mongoose.model("category", categorySchema);


module.exports = categoryModule;
