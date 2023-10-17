import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "../firebase/index";

export const UserContext = React.createContext();

const User = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const auth = getAuth();
  useEffect(() => {
    setLoading(true);
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (!user && location.pathname !== "/signup") {
        navigate("/login");
      }
    });
    return () => {
      unsub();
    };
  }, [auth]);

  return (
    <UserContext.Provider value={{ user, loadingUser: loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default User;
