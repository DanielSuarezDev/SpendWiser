import { useState, FormEvent } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "@/Config/firebase";

interface AuthData {
  email: string;
  password: string;
  name?: string;
}

interface UseSignInReturn {
  handleSignInWithEmailAndPassword: (e: FormEvent) => Promise<void>;
  handleSignInWithGoogle: () => Promise<void>;
  handleSignUp: (e: FormEvent) => Promise<void>;
  error: any;
}

const useSignIn = ({ email, password, name }: AuthData): UseSignInReturn => {
  const [error, setError] = useState(null);

  const handleSignInWithEmailAndPassword = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Error signing in", error);
      setError(error);
    }
  };

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Error signing in with Google", error);
      setError(error);
    }
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      if (user) {
        await updateProfile(user, { displayName: name });
      }
    } catch (error: any) {
      console.error("Error signing up", error);
      setError(error);
    }
  };

  return { handleSignInWithEmailAndPassword, handleSignInWithGoogle, handleSignUp, error };
};

export default useSignIn;
