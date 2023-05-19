import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import { useAuth } from "../../Contexts/AuthContext";

import SignIn from "./Components/SigIn";
import SignUp from "./Components/SignUp";

const LoginPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleToggleForm = () => {
    setShowSignUp((prevShowSignUp) => !prevShowSignUp);
  };

  return (
    <div>
      {showSignUp ? (
        <>
          <SignUp handleToggleForm={handleToggleForm} />
        </>
      ) : (
        <>
          <SignIn handleToggleForm={handleToggleForm} />
        </>
      )}
    </div>
  );
};

export default LoginPage;
