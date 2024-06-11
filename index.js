const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "./src/config.env" });
const PORT = process.env.PORT;
const data = require("./src/config/DB/dbConection.js");
const rout = require("./src/Routes/categoryRoutes.js");
const ApiError = require("./src/utils/apiError");
const userRout=require("./src/Routes/user.routes.js")
const globalError = require("./src/Middleware/ErrorMiddelware");
const routes = require("./src/Routes/productRoute.js");
const app = express();
app.use(express.json());
if (process.env.DOT_NEV === "development") {
    app.use(morgan("dev"));

}

app.use(rout);
app.use(routes)
app.use(userRout);
app.all("*", (req, res, next) => {
  //create error to sent it to error handling middleware
  
  next(new ApiError("Can not find this route", 400));
});
app.use(globalError);

app.listen(PORT, () => {
  console.log("Server is running");
});
