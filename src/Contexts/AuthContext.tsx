// contexts/AuthContext.tsx
import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import { auth } from '../Config/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface AuthContextData {
  user: User | null;
}

const AuthContext = createContext<AuthContextData>(null!);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: FC<any> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
