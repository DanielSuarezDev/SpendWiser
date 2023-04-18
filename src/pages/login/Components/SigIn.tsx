import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  FaEye,
  FaLock,
  FaGoogle,
  FaEyeSlash,
  FaEnvelope,
} from "react-icons/fa";
import React, { useState } from "react";

import { auth } from "../../../Config/firebase";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignInWithEmailAndPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex flex-col items-center w-full justify-center">
      <h2 className="mt-10 mb-4 text-3xl text-slate-700">Iniciar sesion</h2>
      <form
        onSubmit={handleSignInWithEmailAndPassword}
        className="flex flex-col space-y-4 w-full md:w-1/2 lg:w-1/3"
      >
        <div className="relative">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 h-12 rounded-lg w-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 h-12 rounded-lg w-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute inset-y-0 h-12 right-0 flex items-center pr-3 focus:outline-none"
          >
            {showPassword ? (
              <FaEyeSlash className="h-6 w-6 text-gray-400" />
            ) : (
              <FaEye className="h-6 w-6 text-gray-400" />
            )}
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-800 text-white py-2 px-4 rounded h-12"
        >
          Iniciar sesión
        </button>
      </form>
      <button
        onClick={handleSignInWithGoogle}
        className="flex items-center justify-center w-full px-4 py-2 text-white bg-black rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-3 h-12"
      >
        <FaGoogle className="mr-2 text-xl" /> Iniciar sesión con Google
      </button>
    </div>
  );
};

export default SignIn;
