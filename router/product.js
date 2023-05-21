const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndisAdmin,
} = require("../middleware/verifyToken");
const Product = require("../models/Product");

router.post("/", verifyTokenAndisAdmin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      error: "Something went Wrong...............",
      msg: err.toString(),
    });
  }
});

router.put("/:id", verifyTokenAndisAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong..........", msg: err });
  }
});

router.delete("/:id", verifyTokenAndisAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Product deleted succesfully......" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong..........", msg: err });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const query = req.query.new;
    const qCategory = req.query.category;

    let products;
    if (query) {
      products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        catagories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find({});
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      error: "Something went Wrong...............",
      msg: err.toString(),
    });
  }
});

module.exports = router;
