import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { collection, doc, getDoc, deleteDoc } from "firebase/firestore";

import { db } from "../../Config/firebase";

import HistoryDetails from "./Components/HistoryDetailes";
import { useToast } from "@/Contexts/ToastContext";

const HistoryItemPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [historial, setHistorial] = useState<any>(null);
  const { warn } = useToast();

  const handleDelete = async () => {
    try {
      const docRef = doc(db, "history", id);
      await deleteDoc(docRef);
      router.push("/history");
      warn("😵‍💫 Historial eliminado");
    } catch (error) {
      console.error("Error eliminando historial", error);
    }
  };

  useEffect(() => {
    const obtenerHistorial = async () => {
      if (typeof id !== "string") return;

      try {
        const docRef = doc(db, "history", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHistorial({ id: docSnap.id, ...docSnap.data() });
        } else {
          router.push("/history");
        }
      } catch (error) {
        console.error("Error obteniendo historial", error);
      }
    };
    if (id) {
      obtenerHistorial();
    }
  }, [id]);

  if (!historial) {
    return null; // Aquí podrías poner un spinner o algo similar
  }

  return (
    <div className="container mx-auto p-4">
      <HistoryDetails id={id as string} />
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-full absolute bottom-0"
        onClick={handleDelete}
      >
        Eliminar historial
      </button>
    </div>
  );
};

export default HistoryItemPage;
