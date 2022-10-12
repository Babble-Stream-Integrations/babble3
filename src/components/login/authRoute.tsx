import {
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthRoute(props: any) {
  const { children } = props;
  const auth = getAuth();

  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        console.log("unauthorized");
        navigate("/login");
      }
    });

    return () => AuthCheck();
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
}
