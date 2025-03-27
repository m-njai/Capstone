import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth"; // Firebase authentication

// Create the AuthContext
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Store authenticated user data
  const [loading, setLoading] = useState(true); // Loading state during auth initialization
  const auth = getAuth(); // Firebase Auth instance (ensure Firebase is initialized)

  useEffect(() => {
    // Monitor authentication state changes with Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Retrieve user information and custom claims (if any)
          const tokenResult = await firebaseUser.getIdTokenResult();
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email,
            role: tokenResult.claims.role || "Builder", // Default role if none provided
            token: tokenResult.token, // Access token
          });
        } catch (error) {
          console.error("Error fetching ID token:", error);
          setUser(null); // Clear user data on error
        }
      } else {
        setUser(null); // No user is logged in
      }
      setLoading(false); // Mark initialization as complete
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
