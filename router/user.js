const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middleware/verifyToken");
const cryptoJs = require("crypto-js");
const User = require("../models/User");

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = cryptoJs.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: "Something went wrong..........", msg: err });
  }
});

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "User deleted succesfully......" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong..........", msg: err });
  }
});

router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong..........", msg: err });
  }
});

module.exports = router;
