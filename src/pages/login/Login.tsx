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
      router.push('/');
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
          <div>
            ¿Ya tienes una cuenta?{' '}
            <button
              className="text-blue-500 underline"
              onClick={handleToggleForm}
            >
              Inicia sesión
            </button>
          </div>
        </>
      ) : (
        <>
          <SignIn />
          <div>
            ¿No tienes una cuenta?{' '}
            <button
              className="text-blue-500 underline"
              onClick={handleToggleForm}
            >
              Crea una
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginPage;
