import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Config/firebase";
import { useAuth } from "../../Contexts/AuthContext";

interface FormularioState {
  valor: string;
  descripcion: string;
  tienda?: string;
}

const FormProducts: React.FC<any> = () => {
  const { user } = useAuth();

  const [formulario, setFormulario] = useState<FormularioState>({
    valor: "",
    descripcion: "",
    tienda: "",
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
      await addDoc(collection(db, "productos"), {
        ...formulario,
        userId: user?.uid,
      });
      setFormulario({
        valor: "",
        descripcion: "",
        tienda: "",
      });
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  useEffect(() => {
    return () => {
      setFormulario({
        valor: "",
        descripcion: "",
        tienda: "",
      });
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-1">
        <label htmlFor="valor" className="text-gray-600 mb-1">
          Valor
        </label>
        <input
          type="number"
          id="valor"
          name="valor"
          value={formulario.valor}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-1">
        <label
          htmlFor="descripcion"
          className="block text-gray-600 font-medium mb-1"
        >
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formulario.descripcion}
          onChange={handleChange}
          required
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
      </div>

      <div className="mb-1">
        <label
          htmlFor="tienda"
          className="block text-gray-600 font-medium mb-1"
        >
          Tienda
        </label>
        <input
          type="text"
          id="tienda"
          name="tienda"
          value={formulario.tienda}
          onChange={handleChange}
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
