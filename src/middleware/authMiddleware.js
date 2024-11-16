const jwt = require('jsonwebtoken');

// Middleware to verify the JWT token
exports.verifyToken = (req, res, next) => {
  //Get token from the request header
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try { //JWT_SECRET is the secret key used to sign the JWT token. It is stored in the .env file.
    const verified = jwt.verify(token, process.env.JWT_SECRET);
   
    req.user = verified; // Attach the verified user to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

