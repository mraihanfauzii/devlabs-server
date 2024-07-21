const roleMiddleware = (requiredRoles) => ((req, res, next) => {
  const userRole = req.user.role.toLowerCase();

  // Normalize requiredRoles to an array if it's a string
  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

  // Convert requiredRoles to lowercase
  roles.map((role) => role.toLowerCase());

  if (!roles.includes(userRole)) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden',
      code: 403,
    });
  }

  next();
});

module.exports = roleMiddleware;
