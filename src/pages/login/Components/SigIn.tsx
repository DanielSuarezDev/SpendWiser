import {
  FaEye,
  FaGoogle,
  FaEyeSlash,
} from "react-icons/fa";
import React, { useState } from "react";

import Image from "next/image";
import useSignIn from "@/Hook/useSignIn";

import LogoLogin from "@/assets/images/login-image.png";
import LogoHero from "@/assets/images/hero.png";

const SignIn: React.FC<any> = ({handleToggleForm}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { handleSignInWithEmailAndPassword, handleSignInWithGoogle } = useSignIn({email, password});

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex">
      <div className="hidden sm:h-screen sm:block sm:w-3/5 sm:relative">
        <Image src={LogoLogin} alt="Logo"  className="object-cover w-full h-full" />
      </div>

      <div className="flex flex-col items-center w-full justify-center sm:w-2/6 px-2 m-auto">
      <Image src={LogoHero} alt="Logo" width={110} height={110} className="mt-4" />
        <h2 className="mt-10 mb-4 text-3xl text-slate-700">Iniciar sesion</h2>
        <form
          onSubmit={handleSignInWithEmailAndPassword}
          className="flex flex-col space-y-4 w-full justify-center"
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
        <div className="mt-4">
              ¿No tienes una cuenta?{" "}
              <button
                className="text-blue-500 underline"
                onClick={handleToggleForm}
              >
                Crea una cuenta
              </button>
            </div>
      </div>
    </div>
  );
};

export default SignIn;
