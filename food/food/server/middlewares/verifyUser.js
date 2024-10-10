import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

// Verify Token Middleware
export const verifyToken = async (req, res, next) => {
  try {
    let backend_token;
    backend_token = req.cookies.backend_token;
    const authHeader = req.headers.authorization;
    // Check if the Authorization header is present
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token is required',
      });
    }
    // Verify the token
    const decoded = jwt.verify(backend_token, process.env.SECRET_KEY);

    // Attach the decoded user to the request object
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Error in verifyToken middleware:', err.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

// Is Admin Middleware
export const isAdmin = async (req, res, next) => {
  try {
    // Find the user by ID from the token
    const user = await UserModel.findById(req.user.userID);
    console.log(req.user.userID);
    // console.log(user);
    // Check if the user exists
    if (!user) {
      return res.status(403).json({
        success: false,
        message: 'User not found',
      });
    }
    // Check if the user has an admin role
    if (user.role !== 1) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access',
      });
    }
    // User is an admin, proceed to the next middleware
    next();
  } catch (error) {
    console.error('Error in isAdmin middleware:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
