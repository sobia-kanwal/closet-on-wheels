const adminAuth = (req, res, next) => {
  // Check if user is authenticated and is admin
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ 
      message: 'Access denied. Admin privileges required.' 
    });
  }
  next();
};

module.exports = adminAuth;