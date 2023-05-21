const express = require("express");
const app = express();
require("dotenv").config();
const connection = require("./config/connection");

app.use(express.json());
app.use(require("cors")());
app.use(express.static("public"));

app.use("/api/auth/", require("./router/auth"));
app.use("/api/users/", require("./router/user"));
app.use("/api/products/", require("./router/product"));
app.use("/api/carts/", require("./router/cart"));
app.use("/api/orders/", require("./router/order"));
app.use("/api/", require("./router/stripe"));

const start = () => {
  try {
    connection(process.env.MONGO_URI);
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server is running at port 5000.........")
    );
  } catch (error) {
    console.log(error);
  }
};
start();
