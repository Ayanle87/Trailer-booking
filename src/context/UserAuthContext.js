import { createContext, useEffect, useState, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../Firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logIn(email, password) {
    console.log("Email", email);
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    // console.log("Email", email);
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
        });
      } else {
        setUser(null);
      }
    });
    //   useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (updateCurrentUser) => {
    //       setUser(updateCurrentUser);
    //       console.log("Auth state changed. User:", updateCurrentUser);
    //     });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
