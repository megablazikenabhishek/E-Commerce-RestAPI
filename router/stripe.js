const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "inr",
    },
    (stripeErr, stripeRes) => {
      console.log(stripeRes, stripeErr);
      if (stripeErr) return res.status(500).json({ msg: stripeErr.toString() });
      res.status(200).json(stripeRes);
    }
  );
});

module.exports = router;
