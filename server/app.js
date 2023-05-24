const express = require("express");
const data = require("./data");
const app = express();

app.use(require("cors")());

// test
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is listening at port:${port}...........`);
});
