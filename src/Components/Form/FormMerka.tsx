import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";

import { db } from "../../Config/firebase";
import { useAuth } from "../../Contexts/AuthContext";

interface FormularioState {
  value: string;
  description: string;
}

const FormProducts: React.FC<any> = () => {
  const { user } = useAuth();

  const [formulario, setFormulario] = useState<FormularioState>({
    value: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Agrega esto

    try {
      await addDoc(collection(db, "products"), {
        ...formulario,
        userId: user?.uid,
      });
      setFormulario({
        value: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  useEffect(() => {
    return () => {
      setFormulario({
        value: "",
        description: "",
      });
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-1">
        <label htmlFor="value" className="text-gray-600 mb-1">
          Valor
        </label>
        <input
          type="number"
          id="value"
          name="value"
          value={formulario.value}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          inputMode="numeric"
        />
      </div>

      <div className="mb-1">
        <label
          htmlFor="description"
          className="block text-gray-600 font-medium mb-1"
        >
          Descripción
        </label>
        <input
          id="description"
          name="description"
          value={formulario.description}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Guardar
      </button>
    </form>
  );
};

export default FormProducts;
