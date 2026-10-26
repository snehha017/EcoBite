const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check if the request has an authorization header containing a "Bearer" token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Extract the token from the header (format is "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify the token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Find the user in the database, but DO NOT return the password
      req.user = await User.findById(decoded.id).select('-password');

      // 4. Everything is good, move on to the next function
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token was found at all
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };