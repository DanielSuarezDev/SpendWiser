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
  const [displayValue, setDisplayValue] = useState("");

  const [formulario, setFormulario] = useState<FormularioState>({
    value: "",
    description: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "value") {
      const onlyNumbers = value.replace(/[^0-9]/g, "");
      setFormulario({ ...formulario, value: onlyNumbers });
      setDisplayValue(onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    } else {
      setFormulario({ ...formulario, [name]: value });
    }
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
      setDisplayValue("");
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
        <input
          placeholder="Valor"
          type="text"
          id="value"
          name="value"
          value={displayValue}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          inputMode="numeric"
        />
      </div>

      <div className="mb-1">
        <input
          placeholder="Descripción"
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
        className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 w-full"
      >
        Guardar
      </button>
    </form>
  );
};

export default FormProducts;
