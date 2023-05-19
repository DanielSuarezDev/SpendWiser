import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import SignIn from "./Components/SigIn";
import SignUp from "./Components/SignUp";
import Logo from "../../assets/icons/logo-vertical.png";
import Image from "next/image";

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
    // <div className="p-4 flex flex-col items-center justify-center h-screen">
      <div >
        {/* <Image src={Logo} alt="Logo" width={116} height={136} /> */}
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
