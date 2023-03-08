const jwt = require("jsonwebtoken");

const secret = "PTx63GadL_-qoohS9ar9JStiPkMS6ZU4cdaPMsm6DrQ";

const verifyToken = (req, res, next) => {
  // Extract the JWT token from the Authorization header
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header not found" });
  }
  const token = authHeader.split(" ")[1];

  try {
    // Verify the JWT token and extract the user id
    const decoded = jwt.verify(token, secret);
    const email = decoded.email;

    // Add the user id to the request object for use in the route handler
    req.email = email;

    // Call the next middleware or route handler
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = verifyToken;