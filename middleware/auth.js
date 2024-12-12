const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const header = req.header("authentication");
  if (!header) {
    return res.status(401).json({ message: "Access denied" });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
};

module.exports = { authenticate, authorize };
