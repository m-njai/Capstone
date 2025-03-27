const admin = require('firebase-admin');  // If using Firebase Admin for real token verification

// Authenticate the request (simulate Firebase Auth or JWT decoding)
function ensureAuth(req, res, next) {
  const role = req.headers['x-user-role'];      // e.g., "Admin", "Builder", "Supplier", "Compliance Officer"
  const userId = req.headers['x-user-id'];      // simulated user identifier
  if (!role || !userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // If using Firebase, you might do:
  // const idToken = req.headers.authorization?.split(' ')[1];
  // try {
  //   const decoded = await admin.auth().verifyIdToken(idToken);
  //   req.user = { id: decoded.uid, role: decoded.role }; // 'role' from Firebase custom claims
  // } catch (err) {
  //   return res.status(401).json({ error: 'Invalid token' });
  // }
  req.user = { id: userId, role };  // attach user info to request
  next();
}

// Authorize based on allowed roles
function ensureRole(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: Access denied' });
    }
    next();
  };
}

module.exports = { ensureAuth, ensureRole };
