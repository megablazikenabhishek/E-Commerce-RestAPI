const express = require("express");
const data = require("./data");
const app = express();
require("dotenv").config();

app.use(require("cors")());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/seed", require("./routes/seedRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

const port = process.env.PORT || 5000;
const start = () => {
  try {
    require("./config/connnection")(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening at port:${port}...........`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
