const router = require("express").Router();
const User = require("../models/User.js");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: cryptoJs.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong..........", msg: err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json({ msg: "Wrong Credential" });
      return;
    }

    const hashedPassword = cryptoJs.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );

    const password = hashedPassword.toString(cryptoJs.enc.Utf8);

    if (password !== req.body.password) {
      res.status(401).json({ msg: "Wrong Credential" });
      return;
    }

    const { password: pass, ...others } = user._doc;

    const acessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY,
      { expiresIn: "3d" }
    );

    res.status(200).json({ ...others, acessToken });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong..........", msg: err });
  }
});

module.exports = router;
