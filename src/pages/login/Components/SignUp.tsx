import Image from "next/image";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";

import useSignIn from "@/Hook/useSignIn";

import LogoHero from "../../../assets/images/hero.png";
import LogoLogin from "../../../assets/images/login-image.png";

const SignUp: React.FC<any> = ({ handleToggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { handleSignUp, handleSignInWithGoogle } = useSignIn({email, password, name});

  return (
    <div className="flex">
      <div className="hidden sm:h-screen sm:block sm:w-3/5 sm:relative">
        <Image
          src={LogoLogin}
          alt="Logo"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col items-center w-full justify-center sm:w-2/6 px-2 m-auto">
        <Image src={LogoHero} alt="Logo" width={110} height={110} className="mt-4" />
        <h2 className="mt-10 mb-4 text-3xl text-slate-700">Registrarse</h2>
        <form
          onSubmit={handleSignUp}
          className="flex flex-col space-y-4 w-full"
        >
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 h-12 rounded-lg w-full pl-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 h-12 rounded-lg w-full pl-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 h-12 rounded-lg w-full pl-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded mt-4"
          >
            Registrarse
          </button>
        </form>

        <button
          onClick={handleSignInWithGoogle}
          className="flex items-center justify-center w-full px-4 py-2 text-white bg-black rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-3 h-12"
        >
          <FaGoogle className="mr-2 text-xl" /> Registrarse con Google
        </button>

        <div className="mt-4">
          ¿Ya tienes una cuenta?{" "}
          <button
            className="text-blue-500 underline"
            onClick={handleToggleForm}
          >
            Inicia sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
