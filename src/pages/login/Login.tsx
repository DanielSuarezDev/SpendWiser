// pages/login.tsx
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import SignIn from './Components/SigIn';
import SignUp from './Components/SignUp';

const LoginPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    if (user) {
      router.push('/mercado');
    }
  }, [user, router]);

  const handleToggleForm = () => {
    setShowSignUp((prevShowSignUp) => !prevShowSignUp);
  };

  return (
    <div className="container mx-auto p-4">
      {showSignUp ? (
        <>
          <SignUp />
          <p>
            ¿Ya tienes una cuenta?{' '}
            <button
              className="text-blue-500 underline"
              onClick={handleToggleForm}
            >
              Inicia sesión
            </button>
          </p>
        </>
      ) : (
        <>
          <SignIn />
          <p>
            ¿No tienes una cuenta?{' '}
            <button
              className="text-blue-500 underline"
              onClick={handleToggleForm}
            >
              Crea una
            </button>
          </p>
        </>
      )}
    </div>
  );
};

export default LoginPage;
