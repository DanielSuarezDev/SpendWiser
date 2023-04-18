// components/SignUp.tsx
import React, { useState } from 'react';

import { auth } from '../../../Config/firebase';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      if (user) {
        await updateProfile(user, { displayName: name });
      }
    } catch (error) {
      console.error('Error signing up', error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full justify-center">
      <h2 className="mt-10 mb-4 text-3xl text-slate-700">Registrarse</h2>
      <form onSubmit={handleSignUp} className="flex flex-col space-y-4 w-full md:w-1/2 lg:w-1/3">
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
        <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-4">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default SignUp;
