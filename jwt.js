const jwt = require("jsonwebtoken");

//middleware

const jwtAuthMiddleware = (req, res, next) => {
  //extract the web token from the request header
  const token = req.header.autherization.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unautherized" });
  try {
    //verify the token

    const decoded = jwt.verify(token, process.env.JWT_SECERT);

    //Attach user information to request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error(err);
    res.status(401).json({ error: "Invalide token" });
  }
};

//Function to generate  jwt toekn

const generateToken = (userData) => {
  //generate the new jwt token using userData
  return jwt.sign(userData, process.env.JWT_SECERT);
};

module.exports = { jwtAuthMiddleware, generateToken };
