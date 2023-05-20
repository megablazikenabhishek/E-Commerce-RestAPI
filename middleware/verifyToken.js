const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authToken = req.headers.token;
  if (authToken) {
    const token = authToken.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ msg: "Invalid Token........." });
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ msg: "You are not logged in........." });
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    // console.log(req.user);
    if (req.user.id === req.params.id && req.user.isAdmin) return next();
    res.status(403).json({ msg: "You are not authorized........." });
  });
};

const verifyTokenAndisAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) return next();
    res.status(403).json({ msg: "You are not authorized........." });
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndisAdmin,
};
