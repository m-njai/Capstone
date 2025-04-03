const admin = require("firebase-admin");
const serviceAccount = require("../firebaseServiceAccountKey.json"); // Replace with your service account

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Firebase token verification failed", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = verifyFirebaseToken;
