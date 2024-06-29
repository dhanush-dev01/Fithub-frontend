import { createContext, useEffect, useState } from "react";
import { auth, db } from "../ChatModule/firebase"; // Import your firebase config
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import JoggingAnimation from "../JoggingLoader/JoggingLoader";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [customerType, setCustomerType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        setCurrentUser(user);
        setCustomerType(userDoc.data().customerType);
      } else {
        setCurrentUser(null);
        setCustomerType(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <JoggingAnimation/>;
  }

  return (
    <AuthContext.Provider value={{ currentUser, customerType }}>
      {children}
    </AuthContext.Provider>
  );
};
