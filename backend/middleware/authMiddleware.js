const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  // Expect: Authorization: Bearer <token>
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized");
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: ... }
    next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
};

module.exports = protect;