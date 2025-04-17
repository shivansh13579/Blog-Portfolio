// import {
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";
// import { createContext, useContext, useEffect, useState } from "react";
// import { auth, db } from "../lib/firebase";
// import { doc, getDoc, setDoc } from "firebase/firestore";

// const AuthContext = createContext();

// export default function AuthContextProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setIsLoading(true);
//     const unsub = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         setUser(user);
//         await checkAdminRole(user.uid);
//       } else {
//         setUser(null);
//         setIsAdmin(false);
//       }
//       setIsLoading(false);
//     });
//     return () => unsub();
//   }, []);

//   // Function to check if the user is an admin
//   const checkAdminRole = async (uid) => {
//     try {
//       const userRef = doc(db, "users", uid);
//       const userSnap = await getDoc(userRef);
//       if (userSnap.exists() && userSnap.data().role === "admin") {
//         setIsAdmin(true);
//       } else {
//         setIsAdmin(false);
//       }
//     } catch (error) {
//       console.error("Error checking admin role:", error);
//       setIsAdmin(false);
//     }
//   };

//   const handleSignInWithGoogle = async () => {
//     setIsLoading(true);
//     try {
//       const result = await signInWithPopup(auth, new GoogleAuthProvider());
//       const user = result.user;
//       // Check if user already exists in Firestore
//       const userRef = doc(db, "users", user.uid);
//       const userSnap = await getDoc(userRef);

//       if (!userSnap.exists()) {
//         // If new user, add to Firestore with role = "user"
//         await setDoc(userRef, {
//           email: user.email,
//           role: "user",
//         });
//       }

//       await checkAdminRole(user.uid);
//     } catch (error) {
//       setError(error?.message);
//     }
//     setIsLoading(false);
//   };

//   const handleLogout = async () => {
//     setIsLoading(true);
//     try {
//       await signOut(auth);
//       setUser(null);
//       setIsAdmin(false);
//     } catch (error) {
//       setError(error?.message);
//     }
//     setIsLoading(false);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isLoading,
//         error,
//         handleSignInWithGoogle,
//         handleLogout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);
