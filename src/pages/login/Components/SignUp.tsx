// components/SignUp.tsx
import React, { useState } from 'react';

import { auth } from '../../../Config/firebase';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const SignUp: React.FC = () => {

  // Recomiendo usar react-hook-form para todos los formularios
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
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Registrarse</h2>
      <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-4">
          Registrarse
        </button>
      </form>
    </div>
  );
};

// Mejor exportar la constante como export const SignUp en la linea 8, para hacer una importacion explicita donde lo vayas a usar
export default SignUp;
